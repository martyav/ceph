import { Component, Input, OnChanges, OnInit } from '@angular/core';

import * as _ from 'lodash';

import { CellTemplate } from '../../../shared/enum/cell-template.enum';
import { CdTableColumn } from '../../../shared/models/cd-table-column';
import { CdTableSelection } from '../../../shared/models/cd-table-selection';

@Component({
  selector: 'cd-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss']
})
export class RoleDetailsComponent implements OnChanges, OnInit {
  @Input()
  selection: CdTableSelection;
  @Input()
  scopes: Array<string>;
  selectedItem: any;

  columns: CdTableColumn[];
  scopes_permissions: Array<any> = [];

  constructor() {}

  ngOnInit() {
    this.columns = [
      {
        prop: 'scope',
        name: 'Scope',
        flexGrow: 2
      },
      {
        prop: 'read',
        name: 'Read',
        flexGrow: 1,
        cellClass: 'text-center',
        cellTransformation: CellTemplate.checkIcon
      },
      {
        prop: 'create',
        name: 'Create',
        flexGrow: 1,
        cellClass: 'text-center',
        cellTransformation: CellTemplate.checkIcon
      },
      {
        prop: 'update',
        name: 'Update',
        flexGrow: 1,
        cellClass: 'text-center',
        cellTransformation: CellTemplate.checkIcon
      },
      {
        prop: 'delete',
        name: 'Delete',
        flexGrow: 1,
        cellClass: 'text-center',
        cellTransformation: CellTemplate.checkIcon
      }
    ];
  }

  ngOnChanges() {
    if (this.selection.hasSelection) {
      this.selectedItem = this.selection.first();
      // Build the scopes/permissions data used by the data table.
      const scopes_permissions = [];
      _.each(this.scopes, (scope) => {
        const scope_permission = { read: false, create: false, update: false, delete: false };
        scope_permission['scope'] = scope;
        if (scope in this.selectedItem['scopes_permissions']) {
          _.each(this.selectedItem['scopes_permissions'][scope], (permission) => {
            scope_permission[permission] = true;
          });
        }
        scopes_permissions.push(scope_permission);
      });
      this.scopes_permissions = scopes_permissions;
    }
  }
}
