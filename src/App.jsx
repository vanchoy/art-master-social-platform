import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { add, person, home } from "ionicons/icons";
import { getAuth, onAuthStateChanged } from "firebase/auth";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import FeedPage from "./pages/FeedPage";
import AddPage from "./pages/AddPostPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import ProfilePage from "./pages/ProfilePage";
import SinglePostPage from "./pages/SinglePostPage";

setupIonicReact();

function PrivateRoutes({auth}) {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route exact path="/feed" component={FeedPage} />
                <Route exact path="/feed/:id" component={SinglePostPage} />
                <Route exact path="/add" component={AddPage} />
                <Route path="/profile/:id" component={ProfilePage} />
                <Route exact path="/account/settings" component={AccountSettingsPage} />
            </IonRouterOutlet>
            <IonTabBar color="light" slot="bottom">
                <IonTabButton tab="Feed" href="/feed">
                    <IonIcon icon={home} />
                </IonTabButton>
                <IonTabButton tab="add" href="/add">
                    <IonIcon icon={add} />
                </IonTabButton>
                <IonTabButton tab="profile" href={`/profile/${auth.uid}`}>
                    <IonIcon icon={person} />
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

function PublicRoutes() {
    return (
        <IonRouterOutlet>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
        </IonRouterOutlet>
    );
};

export default function App () {
    const [userIsAuthenticated, setUserIsAuthenticated] = useState(localStorage.getItem("userIsAuthenticated"));
    const [user, setUser] = useState({});
    const auth = getAuth();
    
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                console.log(user);
                // User is authenticated
                setUserIsAuthenticated(true);
                localStorage.setItem("userIsAuthenticated", true);
                setUser(user);
            } else {
                // User is signed out
                setUserIsAuthenticated(false);
                localStorage.removeItem("userIsAuthenticated", false);
                setUser({});
            }
        });
    }, [auth]);

    return (
        <IonApp>
            <IonReactRouter>
                {userIsAuthenticated ? <PrivateRoutes auth={user} /> : <PublicRoutes />}
                <Route>{userIsAuthenticated ? <Redirect to="/feed" /> : <Redirect to="/login" />}</Route>
            </IonReactRouter>
        </IonApp>
    );
};