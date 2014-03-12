Ext.define('BLBoard', {
	extend: 'Rally.app.App',
	componentCls: 'app',
//	items:{ html:'<a href="https://help.rallydev.com/apps/2.0rc2/doc/">App SDK 2.0rc2 Docs</a>'},
	launch: function() {
		if (cardBoardConfig) {
			cardBoardConfig.destroy();
		}
		var addNewConfig = {
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
		var cardBoardConfig = {
			xtype: 'rallycardboard',
			types: ['User Story','Defect'],
			attribute: 'Project',
			showPlanEstimate: false,
			columns: [
				{
					value: '/project/719347',
					columnHeaderConfig: {
						headerTpl: '{project}',
						headerData: {
							project: ['Consumer Program / ART', 'Backlog']
						}
					}
				},
				{
					value: '/project/711738',
					columnHeaderConfig: {
						headerTpl: '{project}',
						headerData: {
							project: 'Agile Team 1'
						}
					}
				},
				{
					value: '/project/712193',
					columnHeaderConfig: {
						headerTpl: '{project}',
						headerData: {
							project: 'Agile Team 2'
						}
					}
				},
				{
					value: '/project/712214',
					columnHeaderConfig: {
						headerTpl: '{project}',
						headerData: {
							project: 'Agile Team 3'
						}
					}
				}],
				cardConfig: {
					fields: ['Parent', 'Feature', 'Discussion', 'PlanEstimate'],
					editable: true,
					showIconMenus: true,
					showBlockedReason: true
				},
				storeConfig: {
//				fetch: 'Name,FormattedID,Owner,ObjectID,Project,PlanEstimate',
				filters: [
					{ property: 'ScheduleState', operator: '<', value: 'In-Progress' },
					{ property: 'Iteration', operator: '=', value: '' }
				],
				sorters: [
					{ property: 'Rank', direction: 'ASC' }
				],
//	Specify current project and scoping
				context: this.getContext().getDataContext()
			}
		};
		this.add(addNewConfig);
		this.add(cardBoardConfig);
	}
});
