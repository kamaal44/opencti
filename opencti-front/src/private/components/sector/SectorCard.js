import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createFragmentContainer } from 'react-relay';
import Markdown from 'react-markdown';
import graphql from 'babel-plugin-relay/macro';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { compose } from 'ramda';
import { Domain } from '@material-ui/icons';
import inject18n from '../../../components/i18n';

const styles = theme => ({
  card: {
    width: '100%',
    height: 170,
    backgroundColor: theme.palette.paper.background,
    color: theme.palette.text.main,
    borderRadius: 6,
  },
  cardDummy: {
    width: '100%',
    height: 170,
    backgroundColor: theme.palette.paper.background,
    color: theme.palette.text.disabled,
    borderRadius: 6,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  avatarDisabled: {
    backgroundColor: theme.palette.text.disabled,
  },
  icon: {
    margin: '10px 20px 0 0',
    fontSize: 40,
    color: '#242d30',
  },
  area: {
    width: '100%',
    height: '100%',
  },
  header: {
    paddingBottom: 0,
    marginBottom: 0,
  },
  content: {
    width: '100%',
    height: 89,
    overflow: 'hidden',
    paddingTop: 0,
    fontSize: 15,
  },
  contentDummy: {
    width: '100%',
    height: 89,
    overflow: 'hidden',
    marginTop: 15,
  },
  placeholderHeader: {
    display: 'inline-block',
    height: '.8em',
    backgroundColor: theme.palette.text.disabled,
  },
  placeholderHeaderDark: {
    display: 'inline-block',
    height: '.8em',
    backgroundColor: theme.palette.text.disabledDark,
  },
  placeholder: {
    display: 'inline-block',
    height: '1em',
    backgroundColor: theme.palette.text.disabled,
  },
});

class SectorCardComponent extends Component {
  render() {
    const {
      t, fsd, classes, sector,
    } = this.props;
    return (
      <Card classes={{ root: classes.card }} raised={true}>
        <CardActionArea classes={{ root: classes.area }} component={Link} to={`/dashboard/knowledge/sectors/${sector.id}`}>
          <CardHeader
            classes={{ root: classes.header }}
            avatar={<Avatar className={classes.avatar}>{sector.name.charAt(0)}</Avatar>}
            title={sector.name}
            subheader={`${t('Updated the')} ${fsd(sector.modified)}`}
            action={<Domain className={classes.icon}/>}
          />
          <CardContent classes={{ root: classes.content }}>
            <Markdown source={sector.description} disallowedTypes={['link']} unwrapDisallowed={true}/>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

SectorCardComponent.propTypes = {
  sector: PropTypes.object,
  classes: PropTypes.object,
  t: PropTypes.func,
  fsd: PropTypes.func,
};

const SectorCardFragment = createFragmentContainer(SectorCardComponent, {
  sector: graphql`
      fragment SectorCard_sector on Sector {
          id
          name
          description
          created
          modified
      }
  `,
});

export const SectorCard = compose(
  inject18n,
  withStyles(styles),
)(SectorCardFragment);


class SectorCardDummyComponent extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card classes={{ root: classes.cardDummy }} raised={true}>
        <CardActionArea classes={{ root: classes.area }}>
          <CardHeader
            classes={{ root: classes.header }}
            avatar={<Avatar className={classes.avatarDisabled}>D</Avatar>}
            title={<div className={classes.placeholderHeader} style={{ width: '85%' }}/>}
            titleTypographyProps={{ color: 'inherit' }}
            subheader={<div className={classes.placeholderHeaderDark} style={{ width: '70%' }}/>}
            action={<Domain className={classes.icon}/>}
          />
          <CardContent classes={{ root: classes.contentDummy }}>
            <div className={classes.placeholder} style={{ width: '90%' }}/>
            <div className={classes.placeholder} style={{ width: '95%' }}/>
            <div className={classes.placeholder} style={{ width: '90%' }}/>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

SectorCardDummyComponent.propTypes = {
  classes: PropTypes.object,
};

export const SectorCardDummy = compose(
  inject18n,
  withStyles(styles),
)(SectorCardDummyComponent);
