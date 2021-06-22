//Importar los modulos del router
import { Routes, RouterModule } from "@angular/router";
import {ModuleWithProviders} from "@angular/core";

//Importar Componentes
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/home/home.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { TopicsComponent } from "./components/topics/topics.component";
//Array de rutas
const appRoutes: Routes = [
    {path: "", component: HomeComponent},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "inicio", component: HomeComponent},
    {path: "ajustes", component: UserEditComponent},
    {path: "temas", component: TopicsComponent},
    {path: "temas/:page", component: TopicsComponent},
    {path: "**", component: LoginComponent}
];
//Exportar configuracion
export const appRoutingProviders: any[] =[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);