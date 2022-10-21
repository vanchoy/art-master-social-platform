import {
    IonCard,
    IonImg,
    useIonRouter 
} from "@ionic/react";

export default function UserPostItem({ post }) {
    const router = useIonRouter();

    function goToPostPage() {
        router.push(`/feed/${post.id}`);
    };

    return (
        <IonCard className="full-wdith no-border" color="dark" onClick={goToPostPage}>
            <IonImg className="profile-post-img" src={post.image} />
        </IonCard>
    );
};