import { 
    IonContent, 
    IonHeader,
    IonGrid,
    IonRow,
    IonCol, 
    IonPage, 
    IonTitle, 
    IonToolbar 
} from "@ionic/react";
import { useState, useEffect } from "react";
import PostListItem from "../components/PostCard";
import { postsRef, usersRef } from "../firebase-config";
import { onValue, get } from "firebase/database";

export default function FeedPage() {
    const [posts, setPosts] = useState([]);

    async function getUsers() {
        const snapshot = await get(usersRef);
        const usersArray = [];
        snapshot.forEach(postSnapshot => {
            const id = postSnapshot.key;
            const data = postSnapshot.val();
            const post = {
                id,
                ...data
            };
            usersArray.push(post);
        });

        return usersArray;
    };

    useEffect(() => {
        async function listenOnChange() {
            onValue(postsRef, async snapshot => {
                const users = await getUsers();
                const postsArray = [];
                snapshot.forEach(postSnapshot => {
                    const id = postSnapshot.key;
                    const data = postSnapshot.val();
                    const post = {
                        id,
                        ...data,
                        user: users.find(user => user.id == data.uid)
                    };
                    postsArray.push(post);
                });
                setPosts(postsArray.reverse());
            });
        }
        listenOnChange();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="light">
                    <IonTitle>ART MASTER</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="full-width" color="dark" fullscreen>
                <IonGrid className="postcard ion-no-padding">
                    <IonRow>
                        {posts.map(post => (
                            <IonCol key={post.id} size="1"><PostListItem post={post} key={post.id} /></IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};