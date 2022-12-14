import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonLoading } from "@ionic/react";
import { useHistory } from "react-router-dom";
import PostForm from "../components/PostForm";
import { Toast } from "@capacitor/toast";
import { postsRef } from "../firebase-config";
import { push, set } from "firebase/database";
import { storage } from "../firebase-config";
import { uploadString, ref, getDownloadURL } from "@firebase/storage";
import { getAuth } from "firebase/auth";

export default function AddPostPage() {
    const history = useHistory();
    const [showLoader, dismissLoader] = useIonLoading();
    const auth = getAuth();

    async function handleSubmit(newPost) {
        showLoader();
        newPost.uid = auth.currentUser.uid; // default user id added
        const newPostRef = push(postsRef); // push new to get reference and new id/key
        const newPostKey = newPostRef.key; // key from reference
        const imageUrl = await uploadImage(newPost.image, newPostKey);
        newPost.image = imageUrl;
        set(newPostRef, newPost)
            .then(() => {
                history.replace("/feed");
                Toast.show({
                    text: "New post created!"
                });
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                dismissLoader();
            });
    };

    async function uploadImage(imageFile, postKey) {
        const newImageRef = ref(storage, `${postKey}.${imageFile.format}`);
        await uploadString(newImageRef, imageFile.dataUrl, "data_url");
        const url = await getDownloadURL(newImageRef);
        return url;
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="light">
                    <IonTitle>Create New Post</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent color="dark" fullscreen>
                <PostForm handleSubmit={handleSubmit} />
            </IonContent>
        </IonPage>
    );
};