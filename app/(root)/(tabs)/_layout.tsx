import Fa5Icon from "@/components/Fa5Icon";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { useEffect, useRef } from "react";
import { Platform, StyleSheet, Text, View, Animated } from "react-native";

interface TabIconProps {
  focused: boolean;
  icon: string;
  label: string;
}

const TabIcon = ({ focused, icon, label }: TabIconProps) => {
  const scaleAnim = useRef(new Animated.Value(focused ? 1 : 0.9)).current;
  const fadeAnim = useRef(new Animated.Value(focused ? 1 : 0.7)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: focused ? 1 : 0.9,
        useNativeDriver: true,
        friction: 6,
        tension: 100,
      }),
      Animated.timing(fadeAnim, {
        toValue: focused ? 1 : 0.7,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused, fadeAnim, scaleAnim]);

  return (
    <Animated.View
      style={[
        styles.tabIconContainer,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View style={styles.iconWrapper}>
        {focused ? (
          <>
            <View
              style={[
                styles.glowRing,
                {
                  shadowColor: "#f97316",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.5,
                  shadowRadius: 20,
                  elevation: 8,
                },
              ]}
            />

            <LinearGradient
              colors={["#fb923c", "#f97316", "#ea580c"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.activeButton}
            >
              <LinearGradient
                colors={["rgba(255,255,255,0.3)", "transparent"]}
                style={styles.buttonHighlight}
              />
              <Fa5Icon name={icon} size={24} color="#FFFFFF" solid />
            </LinearGradient>
          </>
        ) : (
          <View style={styles.inactiveButton}>
            <Fa5Icon name={icon} size={22} color="#6B7280" />
          </View>
        )}
      </View>

      <Text
        style={[
          styles.label,
          focused ? styles.labelActive : styles.labelInactive,
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </Animated.View>
  );
};

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "#f97316",
        tabBarInactiveTintColor: "#6B7280",
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Início",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="home" label="Início" />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Corridas",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="motorcycle" label="Corridas" />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="comments" label="Chat" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="user" label="Perfil" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === "ios" ? 88 : 70,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 0,
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 24 : 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 16,
    borderRadius: 35,
  },
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 70,
    height: 70,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: 56,
    marginBottom: 4,
  },
  glowRing: {
    position: "absolute",
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(249, 115, 22, 0.15)",
  },
  activeButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#f97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonHighlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 28,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  inactiveButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  labelActive: {
    color: "#f97316",
  },
  labelInactive: {
    color: "#9CA3AF",
  },
});