import React from 'react';
import {Image, SectionList, StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Divider, List, withTheme} from 'react-native-paper';
import CaptainBadge from './CaptainBadge';
import Theme from '../../../Theme';

export default props => {
    const Chevron = withTheme(({theme}) => (
        <View style={styles.centerVertical}><List.Icon icon="chevron-right" color={theme.colors.disabled} /></View>
    ));

    const renderItem = ({item}) => (
        <List.Item
            left={() => (
                <View style={styles.centerVertical}>
                    <Image
                        source={item.getShirt()}
                        style={styles.shirt}
                    />
                    {
                        item === props.team.captain
                            ? <CaptainBadge string="C"/>
                            : item === props.team.viceCaptain
                            ? <CaptainBadge string="VC"/>
                            : null
                    }
                </View>
            )}
            right={() => <Chevron/>}
            title={item.shortName}
            titleStyle={props.compareTeam && props.compareTeam.getAllPlayers().includes(item) ? styles.bold : null}
            description={item.team.name}
            onPress={props.selectPlayer(item)}
        />
    );

    const renderHeader = ({section: {title}}) => (
        <ListItem
            containerStyle={styles.header}
            title={title}
        />
    );

    return (
        <View style={{flex: 1}}>
            <SectionList
                refreshing={props.refreshing}
                onRefresh={props.refresh}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                renderSectionHeader={renderHeader}
                ItemSeparatorComponent={() => <Divider/>}
                sections={[
                    {title: 'Goalkeepers', data: props.team.goalkeeper},
                    {title: 'Defenders', data: props.team.defenders},
                    {title: 'Midfielders', data: props.team.midfielders},
                    {title: 'Forwards', data: props.team.forwards},
                    {title: 'Substitutes', data: props.team.substitutes},
                ]}
                stickySectionHeadersEnabled
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        elevation: 8,
        backgroundColor: 'white',
    },
    centerVertical: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    shirt: {
        height: 40,
        width: 40,
        resizeMode: 'contain',
    },
    bold: {
        fontWeight: 'bold',
        color: Theme.colors.accent,
    },
});
