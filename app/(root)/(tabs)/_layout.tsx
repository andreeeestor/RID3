import { Tabs } from "expo-router";
import { ReactElement } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

interface TabIconProps {
  focused: boolean;
  icon: ReactElement;
}

const TabIcon = (props: TabIconProps) => (
  <View
    className={`flex flex-row justify-center items-center rounded-full ${
      props.focused ? "bg-general-300" : ""
    }`}
  >
    <View
      className={`rounded-full w-12 h-12 items-center justify-center ${
        props.focused ? "bg-general-400" : ""
      }`}
    ></View>
  </View>
);

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          paddingBottom: 0,
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 20,
          height: 78,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={<Icon name="house" size={28} color={"#FFF"} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Corridas",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={<Icon name="motorcycle" size={28} color={"#FFF"} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={<Icon name="comments" size={28} color={"#FFF"} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={<Icon name="id-badge" size={28} color={"#FFF"} />}
            />
          ),
        }}
      />
    </Tabs>
  );
}
