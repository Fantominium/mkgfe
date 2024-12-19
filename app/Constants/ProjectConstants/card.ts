export interface Card {
    id: string;
    title: string;
    description: string;
    secondaryText: string;
    mediaUrl?: string;
    actions: {
      action1: string;
      action2: string;
    };
  }