import Tab1 from "views/tab1";
import Tab3 from "views/tab3";
import Tab2 from "views/tab2";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import ConfirmEmail from "./views/examples/ConfirmEmail";
import EditProfile from "./views/examples/EditProfile";
import UsersTable from "./views/examples/UsersTable";
import ResetPassword from "./views/examples/ResetPassword";
import ConfirmPassword from "./views/examples/ConfirmPassword";
import ResetPasswordSuccess from "./views/examples/ResetPasswordSuccess";
import Tab4 from "views/tab4";

var routes = [
  {
    path: "/tab4",
    name: "Inscraption for job",
    icon: "ni ni-tv-2 text-primary",
    component: Tab4,
    layout: "/admin",
    api: false,
  },
  {
    path: "/tab1",
    name: "Créer une nouvelle offre d’emploi",
    icon: "ni ni-tv-2 text-primary",
    component: Tab1,
    layout: "/admin",
    api: false,
  },
  {
    path: "/tab2",
    name: "Mes offres d’emploi",
    icon: "ni ni-tv-2 text-primary",
    component: Tab2,
    layout: "/admin",
    api: false,
  },
  {
    path: "/tab3",
    name: "Interviews",
    icon: "ni ni-tv-2 text-primary",
    component: Tab3,
    layout: "/admin",
    api: false,
  },
  
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
    api: false,
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
    api: false,
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
    api: true,
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
    api: false,
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    api: true,
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    api: true,
  },
  {
    path: "/confirm-email/:id",
    name: "Confirm Email",
    icon: "ni ni-check-bold text-green",
    component: ConfirmEmail,
    layout: "/auth",
    api: true,
  },
  {
    path: "/edit-profile",
    name: "Edit Profile",
    icon: "ni ni-ruler-pencil text-info",
    component: EditProfile,
    layout: "/admin",
    api: true,
  },
  {
    path: "/users",
    name: "Users",
    icon: "ni ni-folder-17 text-pink",
    component: UsersTable,
    layout: "/admin",
    api: true,
  },
  {
    path: "/reset-password",
    name: "Reset Password",
    icon: "ni ni-folder-17 text-pink",
    component: ResetPassword,
    layout: "/auth",
    api: true,
  },
  {
    path: "/confirm-password/:id",
    name: "Confirm Password",
    icon: "ni ni-folder-17 text-pink",
    component: ConfirmPassword,
    layout: "/auth",
    api: true,
  },
  {
    path: "/reset-success",
    name: "Password Reset Confirmed",
    icon: "ni ni-folder-17 text-pink",
    component: ResetPasswordSuccess,
    layout: "/auth",
    api: false,
  },
];
export default routes;
