import {OnInit, Component} from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Cadastros',
                items: [
                    { label: 'Atletas', icon: 'pi pi-fw pi-users', routerLink: ['/boxers'] },
                    { label: 'Eventos', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/boxers'] },
                    { label: 'Parceiros', icon: 'pi pi-fw pi-dollar', routerLink: ['/boxers'] },
                    { label: 'Usuários', icon: 'pi pi-fw pi-user-plus', routerLink: ['/boxers'] },
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                ]
            },
        ];
    }
}
