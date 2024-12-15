import { createContext,  useEffect,  useState } from "react";
import axios from 'axios'
export const StoreContext = createContext(null);
const StoreContextProvider = ({children}) => {
    const [cartItems,setCartItems] = useState({});
    const url = "https://zwigato-server-m6w6.onrender.com"
    const[token,setToken] = useState("");
    const[food_list,setFoodList] = useState([]);

    const getTotalCartAmount = () => {
        let totalPrice = food_list.reduce((acc, item) => {
            return acc + (cartItems[item._id] ? item.price * cartItems[item._id] : 0);
        }, 0);

        return totalPrice;
    }

    const addToCart = async (itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev) => ({...prev,[itemId] : 1}));
        }

        else{
            setCartItems((prev) => ({...prev,[itemId] : prev[itemId]+1}))
        }

        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({...prev,[itemId] : prev[itemId]-1}))

        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    const fetchFoodList = async() => {
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
    }

    useEffect(() => {
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"));
            }
        }

        loadData();
    },[])

    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
    }


    return(
        <StoreContext.Provider value = {contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;