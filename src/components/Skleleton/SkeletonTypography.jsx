import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import { Grid2 } from "@mui/material";

const variants = ["h1"];

function TypographyDemo(props) {
  const { loading = false } = props;

  return (
    <div>
      {variants.map((variant) => (
        <Typography component="div" key={variant} variant={variant}>
          {loading ? <Skeleton /> : variant}
        </Typography>
      ))}
    </div>
  );
}

TypographyDemo.propTypes = {
  loading: PropTypes.bool,
};

function SkeletonTypography() {
  return (
    <Grid container spacing={1} direction="column">
      <Grid item>
        <TypographyDemo loading />
      </Grid>
      <Grid item>
        <TypographyDemo loading />
      </Grid>
      <Grid item>
        <TypographyDemo loading />
      </Grid>
      <Grid item>
        <TypographyDemo loading />
      </Grid>
      <Grid item>
        <TypographyDemo loading />
      </Grid>
    </Grid>
  );
}

export default SkeletonTypography;
