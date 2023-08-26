const functions = require("firebase-functions");
const admin = require("firebase-admin");
const logger = require("firebase-functions/logger");

admin.initializeApp();

const db = admin.firestore();

exports.updateAverageRating = functions.firestore
    .document("recipes/{recipeId}/comments/{commentId}")
    .onWrite(async (change, context) => {
        const recipeId = context.params.recipeId;

        // Fetch all comments for the given recipe
        const commentsSnapshot = await db
            .collection("recipes")
            .doc(recipeId)
            .collection("comments")
            .get();

        // Extract ratings from comments
        const ratings = commentsSnapshot.docs.map((doc) => doc.data().rating);

        let avgRating = 0;

        if (ratings.length) {
            const totalRating = ratings.reduce((acc, curr) => acc + curr, 0);
            avgRating = totalRating / ratings.length;
        }

        // Update the main recipe document with the new average rating
        return db
            .collection("recipes")
            .doc(recipeId)
            .update({
                averageRating: avgRating.toFixed(1),
                ratingCount: ratings.length,
            });
    });
