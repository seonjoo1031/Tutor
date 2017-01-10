import React from 'react'
import { Text, View } from 'react-native'
import shallowCompare from 'react-addons-shallow-compare'
import HTMLStyles from './HTMLStyles'

class HTMLElement extends React.Component {
  /* ****************************************************************************/
  // Class
  /* ****************************************************************************/

  static propTypes = {
    tagName: React.PropTypes.string.isRequired,
    renderers: React.PropTypes.object.isRequired,
    groupInfo: React.PropTypes.object,
    parentTagName: React.PropTypes.string,
    htmlStyles: React.PropTypes.object,
    htmlAttibs: React.PropTypes.object,
    onLinkPress: React.PropTypes.func,
    children: React.PropTypes.node,
    parentIsText: React.PropTypes.bool.isRequired
  }

  /* ****************************************************************************/
  // Data Lifecycle
  /* ****************************************************************************/

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  /* ****************************************************************************/
  // UI Events
  /* ****************************************************************************/

  handleLinkPressed (evt) {
    if (this.props.onLinkPress) {
      this.props.onLinkPress(evt, this.props.onLinkPressArg)
    }
  }

  /* ****************************************************************************/
  // Rendering
  /* ****************************************************************************/

  /**
  * Generates the prefix nodes
  * @return prefix nodes if applicable
  */
  prefixNode () {
    if (this.props.tagName === 'li') {
      if (this.props.parentTagName === 'ol') {
        return <Text>{`\n${this.props.groupInfo.index + 1}). `}</Text>
      } else {
        return(
        	<Text style={{fontSize:15,color:'black',}}>•</Text>
        );
      }
    } else {
      return undefined
    }
  }

  /**
  * @return the class for this node
  */
  elementClass () {
    if (HTMLStyles.blockElements.has(this.props.tagName)) {
      if (this.props.parentIsText) {
        console.warn([
          'You are trying to nest a non-text HTML element inside a text element.',
          'The following nodes can only be rendered within themselves and not within text nodes:'
        ].concat(Array.from(HTMLStyles.blockElements)).join('\n'))
        return Text
      } else {
        return View
      }
    } else {
      return Text
    }
  }

  render () {
    const { htmlStyles, tagName, htmlAttribs, renderers, children, ...passProps } = this.props

    if (renderers[tagName]) {
      const copyProps = [
        'htmlStyles',
        'groupInfo',
        'parentTagName',
        'onLinkPress',
        'parentIsText'
      ].reduce((acc, k) => {
        acc[k] = this.props[k]
        return acc
      }, {})
      return renderers[tagName](htmlAttribs, children, copyProps)
    } else {
      const RNElem = this.elementClass() //return View or Text...
      const styleset = RNElem === Text ? HTMLStyles.STYLESETS.TEXT : HTMLStyles.STYLESETS.VIEW
      const style = []
        .concat(
          HTMLStyles.defaultStyles[tagName],
          htmlStyles ? htmlStyles[tagName] : undefined,
          htmlAttribs.style ? HTMLStyles.cssStringToRNStyle(htmlAttribs.style, styleset) : undefined
        ).filter((s) => s !== undefined)


      // console.log('display RNELEM>>');
      // console.log(RNElem);
      // console.log('style display>>');
      // console.log(style);
      // console.log('tagName');
      // console.log(tagName);

      if (tagName === 'li' || tagName ==='ul'){
        style={backgroundColor:"transparent",marginLeft:15};
      }

      if (RNElem === View){
        // console.log('when RNElem is View..');
        // console.log(this.props.children);
        // console.log(this.prefixNode());
        //<ul></ul> => this is when return is returned..-->
        return (

          <RNElem {...passProps} style={style}>
            <View>{this.prefixNode()}</View>
            {this.props.children}
          </RNElem>

        );
      }else{
        //console.log('when RNElem is Text..');
        //always....for all <>tag..
        //console.log(this.props.children);
        //console.log(this.prefixNode());
        //when li tag => only this case, bullet point matters.
        //if not then => Text tag will be used to corretly pass all style description from the parent.
        if(tagName === 'li' || tagName ==='ul'){
          return (
            <View style={[{borderWidth:0,borderColor:'red',flexDirection:'row',marginBottom:5}]}>
              <View style={{width:10,borderColor:'yellow',borderWidth:0}}>{this.prefixNode()}</View>
              <View style={{flex:1,borderColor:'green',borderWidth:0}}>{this.props.children}</View>
            </View>
          );
        }else{
          return (
            <Text {...passProps} style={style}>
              {this.props.children}
            </Text>
          );
        }


      }


    }
  }
}

module.exports = HTMLElement
