//Importar los modulos del router
import { Routes, RouterModule } from "@angular/router";
import {ModuleWithProviders} from "@angular/core";

//Importar Componentes
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

//Array de rutas
const appRoutes: Routes = [
    {path: "", component: LoginComponent},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "**", component: LoginComponent}
];
//Exportar configuracion
export const appRoutingProviders: any[] =[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);