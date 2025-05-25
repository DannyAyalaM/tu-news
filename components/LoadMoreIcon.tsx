import { ActivityIndicator, View } from "react-native";

type LoadMoreIconProps = {
  loading: Boolean;
};
const LoadMoreIcon = ({ loading }: LoadMoreIconProps) => {
  return (
    <>
      {loading && (
        <View style={{ padding: 16 }}>
          <ActivityIndicator size="large" color="#3366FF" />
        </View>
      )}
    </>
  );
};

export default LoadMoreIcon;
