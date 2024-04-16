import { Component, Input, inject } from '@angular/core';
import { SideNavLink } from '../../Models/NavLink.model';
import { CommonService } from '../../Services/Common/common.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  commonService = inject(CommonService);

  userDropdownIcon : boolean = false;
  toggleUserDropdownIcon():void{
    this.userDropdownIcon = !this.userDropdownIcon;      
  }

  @Input() 
    navigationLinks : SideNavLink[] = []

}
