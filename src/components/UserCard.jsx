import {
    IonCard,
    IonAvatar,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonIcon,
    IonButton,
    IonCardContent,
    IonText
} from "@ionic/react";
import { mail, globe } from "ionicons/icons";
import placeholder from "../assets/placeholder.png";

export default function UserCard({ user }) {
//console.log(user)
    return (
        <IonCard color="dark" className="ion-no-margin">
            <IonCardHeader>
                <IonAvatar className="center user-avatar-size">
                    <img alt="Silhouette of a person's head" src={user?.image ? user.image : placeholder} />
                </IonAvatar>
                <IonCardTitle className="ion-text-center">{user?.name ? user.name : "Unknown Name"}</IonCardTitle>
                <IonCardSubtitle className="ion-text-center">{user?.title ? user.title : "Unknown User Title"}</IonCardSubtitle>
                <div className="center">
                    <IonText>{user?.location ? (`${user.location.country}, ${user.location.administrative_area}`) : "No location available"}</IonText>
                </div>
                <div className="center">
                    <IonButton fill="clear" href={`mailto:${user?.emailContact}`}>
                        <IonIcon slot="icon-only" icon={mail}></IonIcon>
                    </IonButton>
                    <IonButton fill="clear" href={user?.website} target="_blank">
                        <IonIcon slot="icon-only" icon={globe}></IonIcon>
                    </IonButton>
                </div>
            </IonCardHeader>
            <IonCardContent>
                <p>{user?.description ? user.description : "No user description"}</p>
            </IonCardContent>
        </IonCard>
    );
};