import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '@app-root-store';
import * as uiActions from '../../store/actions/ui-actions';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent {

  route = '/suppliers';

  constructor(private store: Store<fromRoot.State>, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.data.subscribe(data => {
      this.route = data.isCustomer? '/customers' : '/suppliers';
      this.store.dispatch(new uiActions.SetIsCustomer(data.isCustomer));
    });
  }
}
