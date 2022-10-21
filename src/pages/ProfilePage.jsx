import {
    IonBackButton,
    IonButtons,
    IonButton,
    IonContent,
    IonHeader,
    IonLabel,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonBadge,
    useIonRouter 
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import UserPostItem from "../components/UserPostItem";
import UserCard from "../components/UserCard";
import { getUserRef, postsRef } from "../firebase-config";
import { onValue, query, orderByChild, equalTo, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import { images, peopleCircle, personCircle, settings, videocam } from "ionicons/icons";

import '../theme/global.css';
import '../theme/variables.css';

export default function ProfilePage() {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const params = useParams();
    const userId = params.id;

    const router = useIonRouter();
    const currentUserId = getAuth().currentUser.uid;

    useEffect(() => {
        async function getUserDataOnce() {
            const snapshot = await get(getUserRef(userId));
            const userData = snapshot.val();
            setUser({
                id: userId,
                ...userData
            });
            return userData;
        };

        async function listenOnChange() {
            const postsByUserId = query(postsRef, orderByChild("uid"), equalTo(userId));
            const userData = await getUserDataOnce();

            onValue(postsByUserId, async snapshot => {
                const postsArray = [];
                snapshot.forEach(postSnapshot => {
                    const id = postSnapshot.key;
                    const data = postSnapshot.val();
                    const post = {
                        id,
                        ...data,
                        user: userData
                    };
                    postsArray.push(post);
                });
                setPosts(postsArray.reverse());
            });
        };

        listenOnChange();
    }, [user]);

    function goToAccountSettings() {
        router.push(`/account/settings`);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="light">
                    {user.id !== currentUserId && ( 
                        <IonButtons slot="start">
                            <IonBackButton text="" defaultHref="/feed"></IonBackButton>
                        </IonButtons>
                    )}
                    <IonTitle>{user?.username ? user.username : "Unknown User Name"}</IonTitle>
                    {user.id === currentUserId && (
                        <IonButtons slot="end">
                            <IonButton fill="clear" onClick={goToAccountSettings}>
                                <IonIcon slot="icon-only" icon={settings} />
                            </IonButton>
                        </IonButtons>
                    )}
                </IonToolbar>
            </IonHeader>
            <IonContent color="dark" fullscreen>
                <UserCard user={user} />
                <IonGrid className="grid-col-2 ion-no-padding">
                    <IonRow>
                        <IonCol>
                            <IonItem color="dark">
                                <IonIcon slot="start" icon={peopleCircle}></IonIcon>
                                <IonLabel color="light">Followers:</IonLabel>
                                <IonBadge color="primary">0</IonBadge>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem color="dark">
                                <IonIcon slot="start" icon={personCircle}></IonIcon>
                                <IonLabel color="light">Following:</IonLabel>
                                <IonBadge color="primary">0</IonBadge>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem color="dark">
                                <IonIcon slot="start" icon={images}></IonIcon>
                                <IonLabel color="light">
                                    {posts.length ? `Posts:` : `@${user.username} has no posts yet`}
                                </IonLabel>
                                <IonBadge color="primary">{posts.length}</IonBadge>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem color="dark">
                                <IonIcon slot="start" icon={videocam}></IonIcon>
                                <IonLabel color="light">Videos:</IonLabel>
                                <IonBadge color="primary">0</IonBadge>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>               
                <IonGrid className="grid-col-3 ion-no-padding ion-padding-top">
                    <IonRow>
                        {posts.map(post => (
                            <IonCol key={post.id} size="1"><UserPostItem post={post} key={post.id} /></IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};