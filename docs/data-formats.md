# About

This document describes how data is stored in TCM.

## Surface features

The initial reference surface (based on digitizingg present features) will store
data geojson regions on a current radius earth. The outline of regions will be
stored, as will scattered surface points that will be used to transition from
one surface curvature to another. The format used will be GeoJSON with
additional metadata being stored in the same directory as the main feature.

Typically generated data will be stored in the following URI format:

/tcm/feature/{feature_name}/epoch/{epoch_name}/curated/region.json
/tcm/feature/{feature_name}/epoch/{epoch_name}/curated/region/feature-1.json

Data will be divided between /generated data/ and /curated data/.

- Generated data

  Will store it's generation date and creation method/algorithm along with
  standard provenance such as the radius and epoch it applies to. This data may
  be discarded and regenerated easily. Generated data is generated based on it's
  radius and not it's epoch.

Typical URI's will look like:
/tcm/feature/{feature_name}/radius/5020/generated/region.json
/tcm/feature/{feature_name}/radisu/5020/generated/region/feature-1.json
/tcm/feature/{feature_name}/radius/5030/generated/region.json
/tcm/feature/{feature_name}/radisu/5030/generated/region/feature-1.json

etc..

- Curated data

  Will store the author and creation date. This data should not be deleted but
  versioned when it is updated. Curated data is more concerned with epoch than
  radius. This is to support different contraction and expansion models.

/tcm/feature/{feature_name}/epoch/{epoch_older}/curated/region-adjusted.json
/tcm/feature/{feature_name}/epoch/{epoch_name}/curated/region-adjusted/feature-1.json
