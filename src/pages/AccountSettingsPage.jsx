import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonButtons,
    IonButton,
    IonBackButton,
    IonInput,
    IonIcon,
    IonImg,
    useIonLoading,
    IonAccordionGroup,
    IonAccordion,
} from "@ionic/react";
import { Geolocation } from "@capacitor/geolocation";
import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getUserRef } from "../firebase-config";
import { get, update } from "@firebase/database";
import { Camera, CameraResultType } from "@capacitor/camera";
import { camera, cog, logOut, personCircle } from "ionicons/icons";
import { uploadString, ref, getDownloadURL } from "@firebase/storage";
import { storage } from "../firebase-config";
import { Toast } from "@capacitor/toast";

export default function AccountSettingsPage() {
    const auth = getAuth();
    const [user, setUser] = useState({});
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [website, setWebsite] = useState("");
    const [emailContact, setEmailContact] = useState("");
    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState({});
    const [showLoader, dismissLoader] = useIonLoading();
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [location, setLocation] = useState("");

    useEffect(() => {
        setUser(auth.currentUser);

        async function getUserDataFromDB() {
            const snapshot = await get(getUserRef(user.uid));
            const userData = snapshot.val();
            if (userData) {
                setUsername(userData.username);
                setName(userData.name);
                setTitle(userData.title);
                setDescription(userData.description);
                setWebsite(userData.website);
                setEmailContact(userData.emailContact);
                setImage(userData.image);
                setLocation(userData.location);
            }
        }

        if (user) getUserDataFromDB();
    }, [auth.currentUser, user]);

    function handleSignOut() {
        signOut(auth);
    };

    async function getCurrentPosition() {
        const coordinates = await Geolocation.getCurrentPosition();
        console.log("Current position:", coordinates);
        setLat(coordinates.coords.latitude);
        setLong(coordinates.coords.longitude);
        getLocation(coordinates.coords.latitude, coordinates.coords.longitude);
    };

    async function getLocation(latitude, longitude) {
        const key = "14de60fd94d4d8753fe8a277ba88667a";
        const res = await fetch(
            `http://api.positionstack.com/v1/reverse?access_key=${key}&output=json&query=${latitude},${longitude}`
        );
        const result = await res.json();
        console.log(result);
        const loc = result.data[0];
        console.log(loc);
        setLocation(loc);
    };

    async function takePicture() {
        const imageOptions = {
            quality: 80,
            width: 500,
            allowEditing: true,
            resultType: CameraResultType.DataUrl
        };
        const image = await Camera.getPhoto(imageOptions);
        setImageFile(image);
        setImage(image.dataUrl);
    };

    async function uploadImage() {
        const newImageRef = ref(storage, `${user.uid}.${imageFile.format}`);
        await uploadString(newImageRef, imageFile.dataUrl, "data_url");
        const url = await getDownloadURL(newImageRef);
        return url;
    };

    async function handleSubmit(event) {
        event.preventDefault();
        showLoader();

        const userToUpdate = {
            username: username,
            name: name,
            title: title, 
            description: description,
            website: website,
            emailContact: emailContact,
            location: location,
        };

        if (imageFile.dataUrl) {
            const imageUrl = await uploadImage();
            userToUpdate.image = imageUrl;
        }

        await update(getUserRef(user.uid), userToUpdate);
        dismissLoader();
        await Toast.show({
            text: "User Profile saved!",
            position: "top"
        });
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="light">
                    <IonButtons slot="start">
                        <IonBackButton text="" defaultHref="/feed"></IonBackButton>
                    </IonButtons>
                    <IonTitle>Account Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent color="dark" fullscreen>
                <IonAccordionGroup>
                    <IonAccordion value="first">
                        <IonItem slot="header" color="dark">
                            <IonIcon icon={personCircle} slot="start"></IonIcon>
                            <IonLabel>Public Profile Details</IonLabel>
                        </IonItem>
                        <div slot="content">
                            <form onSubmit={handleSubmit}>
                                <IonItem color="dark">
                                    <IonLabel position="stacked">Username</IonLabel>
                                    <IonInput
                                        value={username}
                                        type="text"
                                        placeholder="Type your username"
                                        onIonChange={e => setUsername(e.target.value)}
                                    />
                                </IonItem>
                                <IonItem color="dark">
                                    <IonLabel position="stacked">Name</IonLabel>
                                    <IonInput
                                        value={name}
                                        type="text"
                                        placeholder="Type your name"
                                        onIonChange={e => setName(e.target.value)}
                                    />
                                </IonItem>
                                <IonItem color="dark">
                                    <IonLabel position="stacked">Title</IonLabel>
                                    <IonInput
                                        value={title}
                                        type="text"
                                        placeholder="Type your title"
                                        onIonChange={e => setTitle(e.target.value)}
                                    />
                                </IonItem>
                                <IonItem color="dark">
                                    <IonLabel position="stacked">Description</IonLabel>
                                    <IonInput
                                        value={description}
                                        type="text"
                                        placeholder="Type your description"
                                        onIonChange={e => setDescription(e.target.value)}
                                    />
                                </IonItem >
                                <IonItem color="dark">
                                    <IonLabel position="stacked">Website</IonLabel>
                                    <IonInput
                                        value={website}
                                        type="text"
                                        placeholder="Type your website"
                                        onIonChange={e => setWebsite(e.target.value)}
                                    />
                                </IonItem >
                                <IonItem color="dark">
                                    <IonLabel position="stacked">Contact Email</IonLabel>
                                    <IonInput
                                        value={emailContact}
                                        type="text"
                                        placeholder="Type your contact email for users"
                                        onIonChange={e => setEmailContact(e.target.value)}
                                    />
                                </IonItem >
                                <IonItem color="dark">
                                    <IonLabel position="stacked">Country</IonLabel>
                                    <IonInput
                                        value={location ? (`${location.country}, ${location.administrative_area}`) : 'No country'}
                                        type="text"
                                        placeholder="Type your contact email for users"
                                        onClick={() => getCurrentPosition()}
                                    />
                                </IonItem>
                                <IonItem color="dark" onClick={takePicture} lines="none">
                                    <IonLabel>Choose Photo</IonLabel>
                                    <IonButton>
                                        <IonIcon slot="icon-only" icon={camera} />
                                    </IonButton>
                                </IonItem>
                                {image && <IonImg className="ion-padding white-background" src={image} onClick={takePicture} />}
                                <div className="ion-padding white-background">
                                    <IonButton color="light" type="submit" expand="block">
                                        Save Changes
                                    </IonButton>
                                </div>
                            </form>
                        </div>
                    </IonAccordion>
                    <IonAccordion value="second">
                        <IonItem slot="header" color="dark">
                            <IonIcon icon={cog} slot="start"></IonIcon>
                            <IonLabel>Private Account Settings</IonLabel>
                        </IonItem>
                        <IonItem color="medium" slot="content">
                            User ID: {user?.uid}
                        </IonItem>
                        <IonItem color="medium" slot="content">
                            User Email: {user?.email}
                        </IonItem>
                    </IonAccordion>
                    <IonAccordion value="third" toggle-icon="">
                        <IonItem slot="header" color="dark" onClick={handleSignOut}>
                            <IonIcon icon={logOut} slot="start"></IonIcon>
                            <IonLabel>Log out</IonLabel>
                        </IonItem>
                    </IonAccordion>
                </IonAccordionGroup>
            </IonContent>
        </IonPage>
    );
};