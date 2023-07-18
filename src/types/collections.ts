import { TMedia } from "./media";

export interface ICollection {
    id: number;
    idCollection?: number;
    coverImage: string;
    title?: string;
    description: string;
  }

export type TCollection = {
    id: number;
    title: string;
    animeCollection: TMedia[];
}
  export type CollectionContextType = {
    collections: TCollection[];
    editCollectionName: (idCollection: number, newName: string) => void;
    deleteFromCollection: (animeId: number, idCollection: number) => void;
    deleteCollection: (idCollection: number) => void;
    saveToCollection: (collection: TMedia, idCollection: number) => void;
    createCollection: (title: string) => void;
    updateCollection: (id: number) => void;
    getCollectionById: (id: number) => Promise<TMedia[]>;
    bulkToCollection: (idCollection: number, collection: TMedia[]) => void;
  };