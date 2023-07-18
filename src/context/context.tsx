import { ReactNode, createContext, useEffect, useState } from "react"
import { CollectionContextType, TCollection } from "../types/collections";
import { TMedia } from "../types/media";

export const AnimeContext = createContext<CollectionContextType | null>(null);

export function ReactContext({children}: {children: ReactNode}) {
    const [collections, setCollections] = useState<TCollection[]>([]);
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);
    
    const saveToCollection = (collection: TMedia, idCollection: number) => {
      if (idCollection) {
        setCollections((prevCollections) =>
          prevCollections.map((collectionItem) =>
            collectionItem.id === idCollection
              ? {
                  ...collectionItem,
                  animeCollection: [...collectionItem.animeCollection, collection],
                }
              : collectionItem
          )
        );
      }
    };

    const deleteFromCollection = (animeId: number, idCollection: number) => {
      setCollections((prevCollections) =>
        prevCollections.map((collection) =>
          collection.id === idCollection
            ? {
                ...collection,
                animeCollection: collection.animeCollection.filter((anime) => anime.id !== animeId),
              }
            : collection
        )
      );
    };

    const bulkToCollection = (idCollection: number, items: TMedia[]) => {
      // Filter out null or undefined items from the 'items' array
      const validItems = items.filter((item) => item !== null && item !== undefined);
      
      setCollections((prevCollections) =>
      prevCollections.map((collection) => {
        if(collection.animeCollection.length !== 0){
          return collection.id === idCollection
          ? {
              ...collection,
              animeCollection: [...collection.animeCollection, ...validItems],
            }
          : collection
          }

          return collection.id === idCollection
          ? {
              ...collection,
              animeCollection: [...validItems],
            }
            : collection
          }
          )
          );
          console.log(collections);
    };
    
    
      const deleteCollection = (idCollection: number) => {
        setCollections((prevCollections) => prevCollections.filter((collection) => collection.id !== idCollection));
      };

      const createCollection = (title: string) => {
        const idRandomCollection = Math.floor(Math.random() * 300);
        const checkIdIsExist = collections?.filter((element) => element.id === idRandomCollection) !== null ? true : false;
        
        if(checkIdIsExist && collections) {
            const collectionData = {
                id: idRandomCollection,
                title: title,
                animeCollection: [],
            }
            setCollections([...collections, collectionData])
            localStorage.setItem("collection", JSON.stringify([...collections, collectionData]))
        }
      }
      
      const updateCollection = (id: number) => {
        if(collections){
            collections.filter((collection: TCollection) => {
                if (collection.id === id) {
                  setCollections([...collections])
                }
              })
        }
      }

      const editCollectionName = (idCollection: number, newName: string) => {
        setCollections((prevCollections) =>
          prevCollections.map((collection) =>
            collection.id === idCollection ? { ...collection, title: newName } : collection
          )
        );
      };

      const getCollectionById = (id: number) => {
        return  new Promise<TMedia[]>((resolve, reject) => {
            if(id){
                const data = collections.filter((collections: TCollection) => collections.id === id)
                resolve(data[0].animeCollection)
            }else [
                reject({message: "no collection found"})
            ]
        })
        //   if(data){
        //     return 
        //     console.log("get col: ",data)
        //   }
        //   return [];
      }

      useEffect(() => {
        const dataCollection: string = localStorage.getItem('collection')!;
        const parse: TCollection[] = JSON.parse(dataCollection) as TCollection[];
        if(parse){
            setCollections(parse)
        }

        setDataLoaded(true);
      }, [])

      useEffect(() => {
        if (dataLoaded){
          localStorage.setItem('collection', JSON.stringify(collections));
        }
      }, [collections, dataLoaded])

    return(
        <AnimeContext.Provider value={{ collections, editCollectionName, deleteFromCollection, deleteCollection, saveToCollection, createCollection, updateCollection, getCollectionById, bulkToCollection }}>
            {children}
        </AnimeContext.Provider>
    )
}