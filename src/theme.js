import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiPagination: {
      ul: {
        justifyContent: 'center',
      },
    },
  },
});

export default theme;