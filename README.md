Backlog Board
=========================

## Overview
This app utilizes a custom Rally cardboard to display story and defect cards in project (team) columns allowing the user to drag-and-drop stories/defects into other projects backlogs. You can also add new items to the scoped project backlog.

The current version defaults to using your currently scoped project and children as project columns for the board. You can edit the code to provide a project picker which allows you to pick the projects displayed as columns on the board. If you use the Project Picker option, it is recommended to set your Rally Project scope to the highest level you might choose backlogs from. This will ensure that all story/defect records are placed on the board.

To switch to the Project picker, edit the following in the deploy/app-uncompressed.html:
// SET usePicker TO true TO USE PROJECT MULTI-SELECT OR SET TO false TO USE CURRENT PROJECT AND CHILDREN
//
		var usePicker = false;  <--- Set to true for Project picker
//

## Screen Shot

![Team Board Example](https://raw.github.com/RallyRonnie/BacklogBoard/master/screenshot.png)

## License

AppTemplate is released under the MIT license.  See the file [LICENSE](./LICENSE) for the full text.

##Documentation for SDK

You can find the documentation on our help [site.](https://help.rallydev.com/apps/2.0rc2/doc/)
