export type CameraFetchReview = {
  id: string;
  createAt: string;
  cameraId: number | null;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number | null;
};

export type CameraReviewSubmit = Omit<CameraFetchReview, 'createAt' | 'id'>;

export type CameraFetchReviews = CameraFetchReview[];
