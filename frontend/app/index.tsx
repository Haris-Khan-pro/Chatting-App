import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-green-600 font-bold text-4xl bg-yellow-200">Hello World</Text>
    </View>
  );
}
