import GameConfig from "./GameConfig";
import User_ZMDGJ_ from "./User/User";
import { ui } from "./ui/layaMaxUI";
import Loading_ZMDGJ_View from "./View/LoadingView/LoadingView";
import Aes_ZMDGJ_Tools from "./Net/AesTools";
import Http_ZMDGJ_Unit from "./Net/HttpUnit";
import Net_ZMDGJ_Config from "./Net/NetConfig";
import WX_ZMDGJ_API from "./WXAPI";
import App_ZMDGJ_Config from "./AppConfig";
import Event_ZMDGJ_Mgr from "./Event/EventMgr";
import { Event_ZMDGJ_Def } from "./Event/EventDef";
import OPPO_ZMDGJ_API from "./OPPOAPI";
import QQ_ZMDGJ_Mini_ZMDGJ_GameAPI from "./QQMiniGameAPI";
import TT_ZMDGJ_API from "./TTAPI";
import ALD from "./ALD";

class Main {

	protected _loadingUI : ui.View.LoadingUI = null;
	protected _loadingView : Loading_ZMDGJ_View = null;
	//预加载列表
	private readonly _preLoadRes : Array<any> = new Array<any> ();

	constructor() {
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;

		if(true == App_ZMDGJ_Config.onTTMiniGame)
		{
			Laya.Browser.onMiniGame = false;
		}

		if(!Laya.Browser.onMiniGame 
			&& !Laya.Browser.onQGMiniGame 
			&& !Laya.Browser.onQQMiniGame
			&& !App_ZMDGJ_Config.onTTMiniGame)//如果不是小游戏，资源服务器设置为本地测试地址
		{
			App_ZMDGJ_Config.Res_ZMDGJ_Server = App_ZMDGJ_Config.Local_ZMDGJ_Test_ZMDGJ_ReServer;
		}

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	onConfigLoaded(): void {
		Laya.loader.maxLoader = 50;
		this.initLoadingView()
		//加载重要配置，这些配置必须在游戏启动前加载完成
		var firstConfigs = 
		[
			{ url: App_ZMDGJ_Config.Res_ZMDGJ_Server + "/json/appswitch.json", type: Laya.Loader.JSON }
		]
		var self = this;
		Laya.loader.load(firstConfigs,Laya.Handler.create(this,()=>
		{
			self.loadRes();//加载资源
		}))
		Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_OnceEvent(Event_ZMDGJ_Def.App_Close_ZMDGJ_First_ZMDGJ_Loading_ZMDGJ_View,this,this.closeloadingUI);
	}

	private initLoadingView()
	{
		this._loadingUI = new ui.View.LoadingUI();
		Laya.stage.addChild(this._loadingUI);
		this._loadingUI.width = Laya.stage.width;
		this._loadingUI.height = Laya.stage.height;
		this._loadingView = this._loadingUI.getComponent(Loading_ZMDGJ_View)
		this._loadingView.set_ZMDGJ_Process(0);
	}


	private postResToOpenDataContext(onComplate : Function)
	{
		if(Laya.Browser.onMiniGame)
		{
			console.log("开始透传资源数据到开放域");
			Laya.loader.load(
				[
					"openRes/Rank.atlas",
				]
				,Laya.Handler.create(null,function()
			{
				Laya.MiniAdpter.sendAtlasToOpenDataContext("openRes/Rank.atlas");    
				console.log("透传资源数据到开放域  完毕！！！");
				if(onComplate)
				{
					onComplate();
				}
			}));
		}
		else
		{
			if(onComplate)
			{
				onComplate();
			}
		}
	}

	private preLoad()
	{
		//这里添加你需要预加载的资源
		//this._preLoadRes.push({ url: AppConfig.ResServer + "/json/example.json", type: Laya.Loader.JSON });
		this._preLoadRes.push({ url: App_ZMDGJ_Config.Local_ZMDGJ_Test_ZMDGJ_ReServer + "/json/storeconfig.json", type: Laya.Loader.JSON });
	}

	loadRes(): void {
		this.preLoad();
		var resource: Array<any> = this._preLoadRes;
		var self = this;
		if (Laya.Browser.onMiniGame) {
			//开始加载分包
			var loadSubResTask: any = Laya.Browser.window["wx"].loadSubpackage({
				name: 'subRes',
				success: (res) => {

					// 分包加载成功,开始预加载资源
					if(resource.length > 0)
					{
						Laya.loader.load(resource, Laya.Handler.create(this, () => {
							self.onLoadResComplate();//预加载完成
						}), Laya.Handler.create(this, (res) => {
							//todo:跟新进度条
							self._loadingView.set_ZMDGJ_Process(res / 2 + 0.5);
						}));
					}
					else
					{
						// 一个分包时策略
						// self.onLoadResComplate();//预加载完成

						// 两个分包时策略
						loadSubResTask = Laya.Browser.window["wx"].loadSubpackage({
							name: 'subRes1',
							success: (res) => {

								// 分包加载成功,开始预加载资源
								if (resource.length > 0) {
									Laya.loader.load(resource, Laya.Handler.create(this, () => {
										self.onLoadResComplate();//预加载完成
									}), Laya.Handler.create(this, (res) => {
										//todo:跟新进度条
										self._loadingView.set_ZMDGJ_Process(res / 2 + 0.5);
									}));
								}
								else {
									self.onLoadResComplate();//预加载完成
								}
							},
							fail: (res) => {
								this.loadRes();//加载失败，重新加载
							}
						});
					}
				},
				fail: (res) => 
				{
					this.loadRes();//加载失败，重新加载
				}
			});
			loadSubResTask.onProgressUpdate(res => 
			{
				self._loadingView.set_ZMDGJ_Process(res / 2);
			});
		} 
		else if(Laya.Browser.onQGMiniGame) //oppo小游戏
		{
			//开始加载分包
			var loadSubResTask: any = Laya.Browser.window["qg"].loadSubpackage({
				name: 'subRes',
				success: (res) => {

					// 分包加载成功,开始预加载资源
					if (resource.length > 0) {
						Laya.loader.load(resource, Laya.Handler.create(this, () => {
							self.onLoadResComplate();//预加载完成
						}), Laya.Handler.create(this, (res) => {
							//todo:跟新进度条
							self._loadingView.set_ZMDGJ_Process(res / 2 + 0.5);
						}));
					}
					else {
						// 一个分包时策略
						// self.onLoadResComplate();//预加载完成

						// 两个分包时策略
						var loadSubResTask: any = Laya.Browser.window["qg"].loadSubpackage({
							name: 'subRes1',
							success: (res) => {
			
								// 分包加载成功,开始预加载资源
								if (resource.length > 0) {
									Laya.loader.load(resource, Laya.Handler.create(this, () => {
										self.onLoadResComplate();//预加载完成
									}), Laya.Handler.create(this, (res) => {
										//todo:跟新进度条
										self._loadingView.set_ZMDGJ_Process(res / 2 + 0.5);
									}));
								}
								else {
									self.onLoadResComplate();//预加载完成
								}
							},
							fail: (res) => {
								this.loadRes();//加载失败，重新加载
							}
						});
					}
				},
				fail: (res) => {
					this.loadRes();//加载失败，重新加载
				}
			});
			loadSubResTask.onProgressUpdate(res => {
				// 加载进度百分比
				var progress = res["progress"];
				// 下载数据
				var totalBytesWritten = res["totalBytesWritten"];
				// 总长度
				var totalBytesExpectedToWrite = res["totalBytesExpectedToWrite"];
				self._loadingView.set_ZMDGJ_Process(progress / 2);
			});
		}
		else if (Laya.Browser.onQQMiniGame) {
			//开始加载分包
			var loadSubResTask: any = Laya.Browser.window["qq"].loadSubpackage({
				name: 'subRes',
				success: (res) => {

					// 分包加载成功,开始预加载资源
					if(resource.length > 0)
					{
						Laya.loader.load(resource, Laya.Handler.create(this, () => {
							self.onLoadResComplate();//预加载完成
						}), Laya.Handler.create(this, (res) => {
							//todo:跟新进度条
							self._loadingView.set_ZMDGJ_Process(res / 2 + 0.5);
						}));
					}
					else
					{
						// 一个分包时策略
						// self.onLoadResComplate();//预加载完成

						// 两个分包时策略
						loadSubResTask = Laya.Browser.window["qq"].loadSubpackage({
							name: 'subRes1',
							success: (res) => {
			
								// 分包加载成功,开始预加载资源
								if(resource.length > 0)
								{
									Laya.loader.load(resource, Laya.Handler.create(this, () => {
										self.onLoadResComplate();//预加载完成
									}), Laya.Handler.create(this, (res) => {
										//todo:跟新进度条
										self._loadingView.set_ZMDGJ_Process(res / 2 + 0.5);
									}));
								}
								else
								{
									self.onLoadResComplate();//预加载完成
								}
							},
							fail: (res) => 
							{
								this.loadRes();//加载失败，重新加载
							}
						});
					}
				},
				fail: (res) => 
				{
					this.loadRes();//加载失败，重新加载
				}
			});
			loadSubResTask.onProgressUpdate(res => 
			{
				self._loadingView.set_ZMDGJ_Process(res / 2);
			});
		} 
		else  {//字节跳动没有分包
			if (resource.length > 0) {
				Laya.loader.load(resource, Laya.Handler.create(this, () => {
					self.onLoadResComplate();
				}), Laya.Handler.create(this, (res) => {
					self._loadingView.set_ZMDGJ_Process(res);
				}));
			}
			else {
				self.onLoadResComplate();
			}
		}
	}

	onLoadResComplate() {
		var self = this;
		this._loadingView.set_ZMDGJ_Process(1);
		if(Laya.Browser.onMiniGame)
		{
			WX_ZMDGJ_API._ZMDGJ_wxLogin_ZMDGJ_(function (code) {
				User_ZMDGJ_.code_ZMDGJ_ = code
				Http_ZMDGJ_Unit.login_ZMDGJ_(
				(res)=> 
				{
					if(res.code == 1)
					{
						console.log("登陆成功！！！");
						User_ZMDGJ_._ZMDGJ_token = res.data.token;
						User_ZMDGJ_.openId_ZMDGJ_ = res.data.openid;
						ALD.ald_ZMDGJ_Send_ZMDGJ_OpenId(User_ZMDGJ_.openId_ZMDGJ_);
						Http_ZMDGJ_Unit.get_ZMDGJ_Game_ZMDGJ_Data((res)=>{
							console.log("获取用户数据成功！！！");
							if(1 == res.code)
							{
								User_ZMDGJ_.initi_ZMDGJ_User(res.data);
							}
							else
							{
								User_ZMDGJ_.initi_ZMDGJ_User(null);
							}
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
								
							}));
						},(res)=>{
							console.log("获取用户数据失败！！！");
							User_ZMDGJ_._ZMDGJ_token = "";
							User_ZMDGJ_.openId_ZMDGJ_ = "";
							User_ZMDGJ_.initi_ZMDGJ_User(null);
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
								
							}));
						})
					}
					else
					{
						console.log("登陆失败！！！" + res);
						User_ZMDGJ_.initi_ZMDGJ_User(null);
						GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
							
						}));
					}
				},
				(res) => 
				{
					console.log("登陆失败！！！" + res);
					User_ZMDGJ_.initi_ZMDGJ_User(null);
					GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
						
					}));
				})
			}, null)
		}
		else if(Laya.Browser.onQGMiniGame) //oppo小游戏
		{
			OPPO_ZMDGJ_API.init_ZMDGJ_AdService(()=>{
	
			},()=>
			{

			},()=>
			{
				
			});

			OPPO_ZMDGJ_API._ZMDGJ_Login_ZMDGJ_(function (token) {
				User_ZMDGJ_.code_ZMDGJ_ = token;
				Http_ZMDGJ_Unit.login_ZMDGJ_(
					(res)=> 
					{
						if(res.code == 1)
						{
							console.log("登陆成功！！！");
							User_ZMDGJ_._ZMDGJ_token = res.data.token;
							User_ZMDGJ_.openId_ZMDGJ_ = res.data.openid;
							Http_ZMDGJ_Unit.get_ZMDGJ_Game_ZMDGJ_Data((res)=>{
								console.log("获取用户数据成功！！！");
								if(1 == res.code)
								{
									User_ZMDGJ_.initi_ZMDGJ_User(res.data);
									console.log("获取用户数据--------------------Start");
									for(var key in res.data)
									{
										console.log(key, res.data[key]);
									}
									console.log("获取用户数据--------------------End");
								}
								else
								{
									User_ZMDGJ_.initi_ZMDGJ_User(null);
								}
								GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

								}));
							},(res)=>{
								console.log("获取用户数据失败！！！");
								User_ZMDGJ_._ZMDGJ_token = "";
								User_ZMDGJ_.openId_ZMDGJ_ = "";
								User_ZMDGJ_.initi_ZMDGJ_User(null);
								GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

								}));
							})
						}
						else
						{
							console.log("登陆失败！！！",res);
							User_ZMDGJ_.initi_ZMDGJ_User(null);
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
	
							}));
						}
					},
					(res) => 
					{
						console.log("登陆失败！！！",res);
						User_ZMDGJ_.initi_ZMDGJ_User(null);
						GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

						}));
					})
			}, null)
		}
		else if(Laya.Browser.onQQMiniGame)  //qq小游戏
		{
			QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._ZMDGJ_Login_ZMDGJ_(function (code) {
				User_ZMDGJ_.code_ZMDGJ_ = code
				Http_ZMDGJ_Unit.login_ZMDGJ_(
				(res)=> 
				{
					if(res.code == 1)
					{
						console.log("登陆成功！！！");
						User_ZMDGJ_._ZMDGJ_token = res.data.token;
						User_ZMDGJ_.openId_ZMDGJ_ = res.data.openid;
						ALD.ald_ZMDGJ_Send_ZMDGJ_OpenId(User_ZMDGJ_.openId_ZMDGJ_);
						Http_ZMDGJ_Unit.get_ZMDGJ_Game_ZMDGJ_Data((res)=>{
							console.log("获取用户数据成功！！！");
							if(1 == res.code)
							{
								User_ZMDGJ_.initi_ZMDGJ_User(res.data);
							}
							else
							{
								User_ZMDGJ_.initi_ZMDGJ_User(null);
							}
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
								
							}));
						},(res)=>{
							console.log("获取用户数据失败！！！");
							User_ZMDGJ_._ZMDGJ_token = "";
							User_ZMDGJ_.openId_ZMDGJ_ = "";
							User_ZMDGJ_.initi_ZMDGJ_User(null);
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
								
							}));
						})
					}
					else
					{
						console.log("登陆失败！！！" + res);
						User_ZMDGJ_.initi_ZMDGJ_User(null);
						GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
							
						}));
					}
				},
				(res) => 
				{
					console.log("登陆失败！！！" + res);
					User_ZMDGJ_.initi_ZMDGJ_User(null);
					GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
						
					}));
				})
			}, null)
		}
		else if(App_ZMDGJ_Config.onTTMiniGame)//头条，字节跳动
		{
			TT_ZMDGJ_API._ZMDGJ_ttLogin_ZMDGJ_(function (code) {
				User_ZMDGJ_.code_ZMDGJ_ = code
				Http_ZMDGJ_Unit.login_ZMDGJ_(
				(res)=> 
				{
					if(res.code == 1)
					{
						console.log("登陆成功！！！");
						User_ZMDGJ_._ZMDGJ_token = res.data.token;
						User_ZMDGJ_.openId_ZMDGJ_ = res.data.openid;
						Http_ZMDGJ_Unit.get_ZMDGJ_Game_ZMDGJ_Data((res)=>{
							console.log("获取用户数据成功！！！");
							if(1 == res.code)
							{
								User_ZMDGJ_.initi_ZMDGJ_User(res.data);
							}
							else
							{
								User_ZMDGJ_.initi_ZMDGJ_User(null);
							}
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
								
							}));
						},(res)=>{
							console.log("获取用户数据失败！！！");
							User_ZMDGJ_._ZMDGJ_token = "";
							User_ZMDGJ_.openId_ZMDGJ_ = "";
							User_ZMDGJ_.initi_ZMDGJ_User(null);
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
								
							}));
						})
					}
					else
					{
						console.log("登陆失败！！！" + res);
						User_ZMDGJ_.initi_ZMDGJ_User(null);
						GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
							
						}));
					}
				},
				(res) => 
				{
					console.log("登陆失败！！！" + res);
					User_ZMDGJ_.initi_ZMDGJ_User(null);
					GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
						
					}));
				})
			}, () => {
				User_ZMDGJ_.initi_ZMDGJ_User(null);
				GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
					
				}));
			})
		}
		else
		{
			User_ZMDGJ_.test_ZMDGJ_InitUser();//测试
			GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
				
			}));
		}
	}

	protected closeloadingUI()
	{
		if(this._loadingUI && !this._loadingUI.destroyed)
		{
			this._loadingUI.destroy();
		}
	}
}
//激活启动类
new Main();
