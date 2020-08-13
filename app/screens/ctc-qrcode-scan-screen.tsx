import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import {
    ViewStyle, View,
    // Text,
    TouchableOpacity,
} from "react-native"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Text, Button } from "react-native-paper"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import { Screen, Row, Col } from "../components"
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import { color, style } from "../theme"

export interface CtcQrcodeScanScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
    flex: 1,
    // backgroundColor: "red"
}

const ScanWindow = () => {

    const onSuccess = e => {
        console.log("Code run already : ", e)
    };


    return (
        <View style={{ flex: 1, width: "100%" }}>


            <QRCodeScanner
                onRead={onSuccess}
                flashMode={RNCamera.Constants.FlashMode.torch}
                // containerStyle={{
                //     height:700,width:"100%"
                // }}
                cameraStyle={{
                    height: 700, width: "100%"
                }}


            />

        </View>
    );

}

export const CtcQrcodeScanScreen: React.FunctionComponent<CtcQrcodeScanScreenProps> = observer(
    (props) => {
        // const { someStore } = useStores()
        const navigation = useNavigation()
        const [scanComplete, setScanComplete] = useState(false)

        return (
            <Screen style={ROOT} preset="scroll" title="Scan QR Code">
                {!scanComplete ? (
                    <Row>
                        <Row>
                            <Col md={12}>
                                <Text>Please scan the QR code on the patient’s CTC ID card.</Text>
                            </Col>
                        </Row>
                        <Row rowStyles={style.contentTextVerticalSpacing}>
                            <Col md={12}>
                                <View
                                    style={{
                                        // flex:1,
                                        height: 700,
                                        backgroundColor: color.offWhiteBackground,
                                    }}
                                >
                                    <ScanWindow />

                                </View>
                            </Col>
                        </Row>
                        <Row rowStyles={style.contentTextVerticalSpacing}>
                            <Col md={12}>
                                <Button
                                    style={[
                                        style.buttonFilled,
                                        { paddingHorizontal: 46, alignSelf: "flex-end" },
                                    ]}
                                    onPress={() => {
                                        setScanComplete(true)
                                    }}
                                    uppercase={false}
                                >
                                    <Text style={style.buttonText}>Next</Text>
                                </Button>
                            </Col>
                        </Row>
                    </Row>
                ) : (
                        <Row>
                            <Row>
                                <Col md={12}>
                                    <Text>Please scan the QR code on the patient’s CTC ID card.</Text>
                                </Col>
                            </Row>
                            <Row rowStyles={style.contentTextVerticalSpacing}>
                                <Col md={12}>
                                    <View
                                        style={{
                                            // flex:1,
                                            height: 700,
                                            backgroundColor: color.offWhiteBackground,
                                        }}
                                    ></View>
                                </Col>
                            </Row>
                            <Row rowStyles={style.contentTextVerticalSpacing}>
                                <Col
                                    md={12}
                                    colStyles={{ justifyContent: "center", alignItems: "center" }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "baseline",
                                        }}
                                    >
                                        <MaterialIcon
                                            name="check-circle"
                                            style={{ alignSelf: "center" }}
                                            size={22}
                                            color="green"
                                        />
                                        <Text
                                            style={[
                                                style.bodyContent,
                                                style.contentTextVerticalSpacing,
                                                { alignSelf: "center", marginLeft: 3 },
                                            ]}
                                        >
                                            QR Code Scanned
                                    </Text>
                                    </View>
                                    <Text
                                        style={[
                                            style.bodyContent,
                                            style.contentTextVerticalSpacing,
                                            { fontWeight: "bold" },
                                        ]}
                                    >
                                        Number: 12345-39-499583
                                </Text>
                                    <Text style={[style.bodyContent, style.contentTextVerticalSpacing]}>
                                        Patient registered.
                                </Text>
                                </Col>
                            </Row>

                            <Row rowStyles={style.contentTextVerticalSpacing}>
                                <Col md={12}>
                                    <Button
                                        style={[
                                            style.buttonFilled,
                                            { paddingHorizontal: 46, alignSelf: "flex-end" },
                                        ]}
                                        onPress={() => {
                                            navigation.navigate("ctc-new-patient-screen")
                                        }}
                                        uppercase={false}
                                    >
                                        <Text style={style.buttonText}>Next</Text>
                                    </Button>
                                </Col>
                            </Row>
                        </Row>
                    )}
            </Screen>
        )
    },
)
