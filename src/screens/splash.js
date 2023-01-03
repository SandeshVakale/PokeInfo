import {useEffect} from "react";
import { PathGradient } from "../components/gradientText/PathGradient";
import { useNavigation } from "@react-navigation/native";
import React from "react";
const Splash = () => {

const navigation = useNavigation();

useEffect(() => 
    {
        setTimeout(() => 
            {
                navigation.navigate('List')
            }
        , 3000)
    }
,[])
    
  return (
          <PathGradient />
  );
};

export default Splash;