import * as React from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { HeaderProps } from "./header.props"
import { Button } from "../button/button"
import { Text } from "../text/text"
// import { Icon } from "../icon/icon"

import { spacing, color } from "../../theme"
import { translate } from "../../i18n/"
import { palette } from "../../theme/palette"

// static styles
const ROOT: ViewStyle = {
    flexDirection: "row",
    paddingHorizontal: spacing[0],
    alignItems: "center",
    paddingTop: spacing[0],
    paddingBottom: spacing[2],
    marginBottom: spacing[4],
    marginRight: spacing[2],
    marginLeft: spacing[2],
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: color.palette.lighterGrey,
}
const TITLE: TextStyle = { textAlign: "center" }
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: "flex-start" }
const LEFT: ViewStyle = { width: 0 }
const RIGHT: ViewStyle = { width: 0 }
const RIGHT_ICON_CONTAINER: ViewStyle = { flexDirection:"row-reverse" }

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export const Header: React.FunctionComponent<HeaderProps> = props => {
    const {
        onLeftPress,
        onRightPress,
        rightIcon,
        leftIcon,
        headerText,
        headerTx,
        style,
        titleStyle,
    } = props
    const header = headerText || (headerTx && translate(headerTx)) || ""

    return (
        <View style={{}}>
            <View style={{...RIGHT_ICON_CONTAINER}} >
                <Icon name="menu" size={32}  color={color.black} />
            </View>
            <View style={{ ...ROOT, ...style }}>
                {leftIcon ? (
                    <Button preset="link" onPress={onLeftPress}>
                        <Icon icon={leftIcon} />
                    </Button>
                ) : (
                        <View style={LEFT} />
                    )}
                <View style={TITLE_MIDDLE}>
                    <Text style={{ ...TITLE, ...titleStyle }} size="h4" text={header} />
                </View>
                {rightIcon ? (
                    <Button preset="link" onPress={onRightPress}>
                        <Icon icon={rightIcon} />
                    </Button>
                ) : (
                        <View style={RIGHT} />
                    )}
            </View>
        </View>

    )
}
