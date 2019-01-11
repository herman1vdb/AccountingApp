import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AccountEditComponent } from '../accounts/account-edit/account-edit/account-edit.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<AccountEditComponent>{
    canDeactivate(component: AccountEditComponent) {
        if (component.editForm.dirty) {
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        return true;
    }
}