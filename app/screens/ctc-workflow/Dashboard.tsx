import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TouchableOpacity, View, Image, StyleSheet } from "react-native"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen } from "../../components"
import { color, style, md } from "../../theme"
import { Card, Button, FAB, Text } from "react-native-paper"
import Process from "../../assets/icons/process.svg"
import DrugsNurse from "../../assets/icons/drugs-nurse.svg"
import DataExtraction from "../../assets/icons/data-extraction.svg"
import FileSearching from "../../assets/icons/file_searching.svg"
import Analytics from "../../assets/icons/business_analytics.svg"
import DashboardItem from "../../components/dashboard-item/dashboard-item"

export interface DashboardScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
    flex: 1,
}

const Dashboard: React.FunctionComponent<DashboardScreenProps> = observer((props) => {
    // const { someStore } = useStores()
    const navigation = useNavigation()

    // determine previleges and give the approprivate route
    // for the dashboard item
    const getRoute = () => {
        // other codes here
        // return "client-present"
        // return "".toString()
    }

    return (
        <>
            <Screen preset="scroll" title="Elsa Health Assistant">
                <View style={{ paddingBottom: 20 }}>
                    <DashboardItem
                        title="New Patient Assessment"
                        icon={<DrugsNurse width="130" height="130" />}
                        actionText="Begin New Assessment"
                        description="Assess your patients’ symptoms to understand more about their health and receive valuable insights for next steps to take."
                        route="ctc.ScanQRCode"
                    />

                    <DashboardItem
                        title="Patient File"
                        icon={<FileSearching width="130" height="130" />}
                        actionText="Create or Update File"
                        description="Register a new patient or update a patient file to include test information and/or diagnoses. See recommendations and next steps about the patient."
                        route="ctc.ScanQRCode"
                        routeParams={{ destination: "ctc.PatientFile" }}
                    />

                    <DashboardItem
                        title="Risk of Non-Adherence"
                        icon={<Analytics width="130" height="130" />}
                        actionText="Assess Adherence"
                        description="The Elsa Library provides information about common illnesses, recommendations for next steps, and prevention strategies."
                        route="ctc-patient-adherence-audit"
                        routeParams={{ mode: "adherence" }}
                    />

                    <DashboardItem
                        title="Risk of Drug Resistance"
                        icon={<DataExtraction width="130" height="130" />}
                        actionText="Assess Risk of Drug Resistance"
                        description="The Elsa Library provides information about common illnesses, recommendations for next steps, and prevention strategies."
                        route="client-present"
                    />

                    <DashboardItem
                        title="Elsa Library"
                        actionText="Visit Elsa Library"
                        description="The Elsa Library provides information about common illnesses, recommendations for next steps, and prevention strategies."
                        route="disease-library"
                    />
                    <DashboardItem
                        title="Feedback/ Report Problem"
                        actionText="Report Problem/ Feedback"
                        description="Please provide feedback about your experience to help improve the Elsa Health Assistant."
                        route="feedback"
                    />
                </View>
            </Screen>
            <FAB
                style={styles.actionButton}
                icon="plus"
                onPress={() => navigation.navigate("ctc.ScanQRCode",{})}
            />
        </>
    )
})

const styles = StyleSheet.create({
    actionButton: {
        backgroundColor: color.primary,
        bottom: md ? 36 : 12,
        height: md ? 60 : 40,
        position: "absolute",
        right: md ? 36 : 12,
        width: md ? 60 : 40,
    },
})

export default Dashboard
