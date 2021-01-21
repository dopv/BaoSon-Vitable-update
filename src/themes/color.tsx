/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const color = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  /**
   * The screen background.
   */
  background: '#ffffff',
  /**
   * The main tinting color.
   */
  primary: '#FBA928',
  /**
   * The main tinting color, but darker.
   */
  primaryDarker: '#EB9918',
  /**
   * A subtle color used for borders and lines.
   */
  line: '#e6e6e6',
  /**
   * The default color of text in many components.
   */
  text: '#FFFFFF',
  /**
   * Secondary information.
   */
  dim: '#939AA4',
  /**
   * Error messages and icons.
   */
  error: '#dd3333',

  /**
   * Storybook background for Text stories, or any stories where
   * the text color is color.text, which is white by default, and does not show
   * in Stories against the default white background
   */
  storybookDarkBg: '#1d1d1d',

  /**
   * Storybook text color for stories that display Text components against the
   * white background
   */
  storybookTextColor: '#1d1d1d',

  headerColor: '#eb3323',

  titleHeaderColor: '#bf3127',

  hotNew:'#bf3127',

  backgroundNew:'#aa2a21',

  iconBottomTab: '#444444'
};
