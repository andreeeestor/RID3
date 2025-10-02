import { Stack } from "expo-router";

interface AuthLayoutProps {

}
export default function AuthLayout(props : AuthLayoutProps){
    return(
        <Stack>
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up" options={{ headerShown: false }} />
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        </Stack>
    )
}