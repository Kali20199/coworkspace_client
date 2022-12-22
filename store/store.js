import { createContext, useContext } from "react";
import CoWorkStore from './CoWorkStore'
import UserStore from './User'
import  HubStore  from './HubStore';
import InfoStore from './InfoStore'
import PlacesStore from './PlacesStore'

export const store=({
    CoWorkStore:new CoWorkStore(),
    UserStore:new UserStore(),
    Hub:new HubStore(),
    InfoStore:new InfoStore(),
    PlaceStore:new PlacesStore(),
})


export const StoreContext = createContext(store)

export function useStore(){
    return useContext(StoreContext)
} 