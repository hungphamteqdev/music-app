export interface Track {
  played_at: number;
  track_id: number;
  track: {
    artwork_url: string;
    caption: string;
    title: string;
    id: number;
    media: {
      transcodings: [
        {
          url: string;
          format: {
            protocol: string;
            mime_type: string;
          };
        }
      ];
    };
    user: {
      username: string;
    };
  };
}
