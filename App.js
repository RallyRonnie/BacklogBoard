Ext.define('BLBoard', {
	extend: 'Rally.app.App',
	componentCls: 'app',
//	items:{ html:'<h1>Please scope your Rally Project to the Project you might add stories/defects</h1>'},
//	items:{ html:'<a href="https://help.rallydev.com/apps/2.0rc2/doc/">App SDK 2.0rc2 Docs</a>'},
	launch: function() {
//
// SET usePicker TO true TO USE PROJECT MULTI-SELECT OR SET TO false TO USE CURRENT PROJECT AND CHILDREN
//
		var usePicker = false;
//
		var ppicker = null;
		var cardBoardConfig = null;
		var addNewConfig = null;
		var pcolumns = '[';
		if (!usePicker) {
			var cproj = this.getContext().getProject().ObjectID;
			var cname = this.getContext().getProject().Name;
//			console.log(cproj + cname);
			var pcolumn = "{ value: '/project/" + this.getContext().getProject().ObjectID + "', columnHeaderConfig: { headerTpl: '{project}', headerData: { project: '" + this.getContext().getProject().Name + "' } } }";
			pcolumns = pcolumns + pcolumn + ",";

			var pc = Ext.create('Rally.data.WsapiDataStore', {
				autoLoad: true,
				fetch: [ 'Name', 'ObjectID' ],
				filters: [
					{ property: 'Parent.ObjectID', value: '__PROJECT_OID__' }
				],
				model: 'Project',
				listeners: {
					load: function(store, data) {
						Ext.Array.each(data, function(child) {
//							console.log(child.get('Name')); //Logs the child name
							pcolumn = "{ value: '/project/" + child.get('ObjectID') + "', columnHeaderConfig: { headerTpl: '{project}', headerData: { project: '" + child.get('Name') + "' } } }";
							pcolumns = pcolumns + pcolumn + ",";
						});
						pcolumns = pcolumns.substring(0, pcolumns.length - 1) + "]";
						doBoard();
						this.add(addNewConfig);
						this.add(cardBoardConfig);
					},
					scope: this
				}
			});
		}
		else
		{
		ppicker = Ext.create('Ext.Container', {
			items: [{
				xtype: 'rallymultiobjectpicker',
				modelType: 'project',
				emptyText: 'Pick Projects',
				placeholderText: "",
				loadingText: "",    
				storeConfig : {
				fetch: ['Name', 'ObjectID']
				},
				listCfg: {
					displayField: ['Name', 'ObjectID']
				},
				listeners: {
					collapse:function(p) {
						_.each( p.getValue(), function (pn) {
							var pcolumn = "{ value: '/project/" + pn.get('ObjectID') + "', columnHeaderConfig: { headerTpl: '{project}', headerData: { project: '" + pn.get('Name') + "' } } }";
							pcolumns = pcolumns + pcolumn + ",";

//							console.log("name: " + pn.get("Name"));
//							console.log("OID: " + pn.get("ObjectID"));
						});
						pcolumns = pcolumns.substring(0, pcolumns.length - 1) + "]";
//						console.log(p.getValue());
						this.removeAll();
						doBoard();
						this.add(addNewConfig);
						this.add(cardBoardConfig);
					},
					scope: this
				}
			}]
		});
		}
		function doBoard() {
			addNewConfig = {
				xtype: 'rallyaddnew',
				recordTypes: ['User Story', 'Defect'],
				ignoredRequiredFields: ['Name', 'ScheduleState', 'Project'],
				listeners: {
					create: function(addNew, record) {
						Ext.Msg.alert('Add New', 'Added record named ' + record.get('Name'));
					}
				},
				showAddWithDetails: true
			};
			cardBoardConfig = {
				xtype: 'rallycardboard',
				types: ['User Story','Defect'],
				attribute: 'Project',
				columns: eval(pcolumns),
					cardConfig: {
						fields: ['Parent', 'Feature', 'Discussion', 'PlanEstimate'],
						editable: true,
						showIconMenus: true,
						showBlockedReason: true
					},
				storeConfig: {
					filters: [
						{ property: 'ScheduleState', operator: '<', value: 'In-Progress' },
						{ property: 'Iteration', operator: '=', value: '' }
					],
					sorters: [
						{ property: 'Rank', direction: 'ASC' }
					]
				}
			};
		}
		if (usePicker) {
			this.add(ppicker);
		}
	}
});
