import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonButtons,
    IonBackButton
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PostViewItem from "../components/PostView";
import { getPostRef, usersRef } from "../firebase-config";
import { onValue, get } from "firebase/database";
import '../theme/global.css';
import '../theme/variables.css';

export default function SinglePostPage() {
    const [post, setPost] = useState([]);
    const params = useParams();
    const postId = params.id;

    async function getUsers() {
        const snapshot = await get(usersRef);
        const userArray = [];
        snapshot.forEach(postSnapshot => {
            const id = postSnapshot.key;
            const data = postSnapshot.val();
            const post = {
                id,
                ...data
            };
            userArray.push(post);
        });

        return userArray;
    }

    useEffect(() => {
        async function listenOnChange() {
            onValue(getPostRef(postId), async snapshot => {
                const users = await getUsers();
                    const id = snapshot.key;
                    const data = snapshot.val();
                    const post = {
                        id,
                        ...data,
                        user: users.find(user => user.id == data.uid)
                    };
                setPost(post);
            });
        }
        listenOnChange();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="light">
                    <IonButtons slot="start">
                        <IonBackButton text="" defaultHref="/feed"></IonBackButton>
                    </IonButtons>
                    <IonTitle>ART MASTER</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="full-width" color="dark" fullscreen>
                <IonGrid className="postcard ion-no-padding">
                    <IonRow>
                        <IonCol size="1"><PostViewItem post={post} /></IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};