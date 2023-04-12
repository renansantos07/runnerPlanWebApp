import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthComponent } from "./auth.component";

const authRouterConfig: Routes = [
    {
        path: '', component: AuthComponent,
        children: [
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(authRouterConfig)
    ],
    exports:[
        RouterModule
    ]
})
export class AuthRoutingModule {}