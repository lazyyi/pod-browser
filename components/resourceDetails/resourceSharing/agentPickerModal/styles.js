/**
 * Copyright 2020 Inrupt Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { createStyles } from "@solid/lit-prism-patterns";

const MODAL_MIN_WIDTH = 680;
const MODAL_MIN_HEIGHT = 680;
const TABLE_MAX_HEIGHT = 450;
const MOBILE_TABLE_MIN_HEIGHT = 300;

export default function styles(theme) {
  return createStyles(theme, ["icons", "button", "table"], {
    paper: {
      [theme.breakpoints.up("sm")]: {
        minWidth: MODAL_MIN_WIDTH,
        minHeight: MODAL_MIN_HEIGHT,
        height: "auto",
        width: MODAL_MIN_WIDTH,
        padding: theme.spacing(2, 4, 3),
      },
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      backgroundColor: theme.palette.grey[50],
      borderRadius: theme.shape.borderRadius,
      boxShadow:
        "0 9px 46px 8px rgba(0,0,0,0.12), 0 24px 38px 3px rgba(0,0,0,0.14), 0 11px 15px -7px rgba(0,0,0,0.2)",
      minWidth: "100vw",
      minHeight: "100vh",
      width: "100vw",
      height: "100vh",
      padding: theme.spacing(2, 1.4, 3),
    },
    title: {
      ...theme.typography.h1,
      marginBottom: theme.spacing(1.2),
    },
    tableContainer: {
      minHeight: MOBILE_TABLE_MIN_HEIGHT,
      [theme.breakpoints.up("xs")]: {
        minHeight: "unset",
      },
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.common.white,
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${theme.palette.grey.A100}`,
      marginBottom: theme.spacing(2.4),
      height: "100%",
      maxHeight: TABLE_MAX_HEIGHT,
      overflowY: "auto",
    },
    tabsAndAddButtonContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: `1px solid ${theme.palette.grey.A100}`,
    },
    agentPickerTable: {
      width: `calc(100% - ${theme.spacing(1.6) * 2}px)`,
      boxSizing: "border-box",
      marginLeft: theme.spacing(1.6),
      marginRight: theme.spacing(1.6),
      "&& thead > tr": {
        minWidth: "100%",
        fontSize: theme.typography.caption.fontSize,
        alignItems: "center",
        borderBottom: `1px solid ${theme.palette.grey.A100}`,
        fontWeight: theme.typography.body1.fontWeight,
        color: theme.palette.text.primary,
      },
      "&& tbody tr": {
        borderBottom: `1px solid ${theme.palette.grey.A100}`,
      },
      "&& tbody td": {
        maxWidth: "100%",
      },
      "&& tbody :last-child": {
        borderBottom: "none",
      },
    },
    tableHeader: {
      display: "flex",
      margin: 0,
      padding: theme.spacing(0.5),
      textTransform: "capitalize",
    },
    modalTabsContainer: {
      borderBottom: "none !important", // overriding the default border bottom so we can set it to the whole width of the container
    },
    canShareTableHeader: {
      display: "flex",
      margin: 0,
      alignSelf: "flex-end",
      alignItems: "center",
    },
    buttonsContainer: {
      display: "flex",
      flexDirection: "column-reverse",
      position: "relative",
      bottom: 0,
      width: "100%",
      padding: 0,
      alignItems: "center",
      justifyContent: "space-between",
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        position: "absolute",
        flexDirection: "row",
        width: MODAL_MIN_WIDTH - theme.spacing(2.4) * 2 - theme.spacing(4), // substracting the padding of the buttons and the left and right padding of the modal
        maxWidth: "100%",
        padding: theme.spacing(2.4),
      },
    },
    cancelButton: {
      textAlign: "center",
      width: "100%",
      fontSize: theme.typography.body1.fontSize,
      fontWeight: theme.typography.body1.fontWeight,
      padding: theme.spacing(1.4, 1.8),
      backgroundColor: "transparent",
      [theme.breakpoints.up("sm")]: {
        width: "max-content",
      },
    },
    submitAgentsButton: {
      textAlign: "center",
      width: "100%",
      fontSize: theme.typography.body1.fontSize,
      fontWeight: theme.typography.body1.fontWeight,
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
      padding: theme.spacing(1.4, 1.8),
      [theme.breakpoints.up("sm")]: {
        width: "max-content",
      },
    },
    capitalizedText: {
      textTransform: "capitalize",
    },
    emptyStateTextContainer: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(0.7, 1.4),
      textAlign: "center",
    },
    // hopefully we can remove these once we figure out how to test the Hidden component from MUI so we can use that instead
    mobileOnly: {
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
      display: "flex",
    },
    desktopOnly: {
      [theme.breakpoints.up("sm")]: {
        display: "flex",
      },
      display: "none",
    },
  });
}
