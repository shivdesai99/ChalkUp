import { Provider as PaperProvider } from "react-native-paper";
import { View, Text } from "react-native";
import { styled } from "nativewind";
import { Button as PaperButton } from "react-native-paper";

const Button = styled(PaperButton);

export default function App() {
  return (
    <PaperProvider>
      <View className="flex-1 items-center justify-center bg-gray-100">
        <Text className="text-lg text-gray-800">Welcome to ChalkUp!</Text>
        <Button
          className="bg-blue-500 text-white mt-4"
          mode="contained"
          onPress={() => console.log("Button Pressed!")}
        >
          Test Button
        </Button>
      </View>
    </PaperProvider>
  );
}