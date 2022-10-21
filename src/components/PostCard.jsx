import {
    IonCard,
    IonCardContent,
    IonImg,
    IonItem,
    IonButton,
    IonIcon,
    useIonAlert,
    useIonActionSheet,
    useIonModal,
    IonAvatar,
    IonLabel,
    useIonRouter 
} from "@ionic/react";
import { ellipsisHorizontalOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { Toast } from "@capacitor/toast";
import PostUpdateModal from "./PostUpdateModal";
import { remove } from "@firebase/database";
import { getPostRef, storage } from "../firebase-config";
import { ref, deleteObject } from "@firebase/storage";
import { getAuth } from "firebase/auth";
import placeholder from "../assets/placeholder.png";

export default function PostListItem ({ post }) {
    const [presentActionSheet] = useIonActionSheet();
    const [presentDeleteDialog] = useIonAlert();
    const [presentUpdateModal, dismissUpdateModal] = useIonModal(
        <PostUpdateModal post={post} dismiss={handleDismissUpdateModal} />
    );
    const history = useHistory();
    const router = useIonRouter();
    const currentUserId = getAuth().currentUser.uid;

    function showActionSheet(event) {
        event.preventDefault();
        presentActionSheet({
            buttons: [
                { text: "Edit", handler: presentUpdateModal },
                { text: "Delete", role: "destructive", handler: showDeleteDialog },
                { text: "Cancel", role: "cancel" }
            ]
        });
    };

    function showDeleteDialog() {
        presentDeleteDialog({
            header: "Delete Post",
            message: "Do you want to delete post?",
            buttons: [{ text: "No" }, { text: "Yes", role: "destructive", handler: deletePost }]
        });
    };

    function handleDismissUpdateModal() {
        dismissUpdateModal();
    };

    async function deletePost() {
        let imageName = post.image.split("/").pop();
        imageName = imageName.split("?alt")[0];
        const imageRef = ref(storage, imageName);
        await deleteObject(imageRef);
        remove(getPostRef(post.id));

        await Toast.show({
            text: "Post deleted!",
            position: "center"
        });
    };

    function goToUserDetailView() {
        history.push(`profile/${post.uid}`);
    };

    function goToPostPage() {
        router.push(`feed/${post.id}`);
    };

    return (
        <IonCard className="post-card-full-width" color="dark">
            <IonItem lines="none" color="dark">
                <IonAvatar slot="start" onClick={goToUserDetailView}>
                    <IonImg src={post.user?.image ? post.user.image : placeholder} />
                </IonAvatar>
                <IonLabel onClick={goToUserDetailView}>
                    <h2>{post.user?.username ? `@${post.user.username}` : "Unknown Username"}</h2>
                    <p>{post.user?.title ? post.user.title : "Unknown User Title"}</p>
                </IonLabel>
                {post.uid == currentUserId && (
                    <IonButton fill="clear" onClick={showActionSheet}>
                        <IonIcon color="medium" slot="icon-only" icon={ellipsisHorizontalOutline} />
                    </IonButton>
                )}
            </IonItem>
            <IonImg className="post-img" src={post.image} onClick={goToPostPage} />
            <IonCardContent>
                <p>{post?.keywords ? post.keywords : "No keywords specified"}</p>
            </IonCardContent>
        </IonCard>
    );
};