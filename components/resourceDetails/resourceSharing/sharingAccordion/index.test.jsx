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

import React from "react";
import { renderWithTheme } from "../../../../__testUtils/withTheme";
import ResourceSharing from "./index";
import usePermissions from "../../../../src/hooks/usePermissions";
import * as permissionHelpers from "../../../../src/solidClientHelpers/permissions";

jest.mock("../../../../src/hooks/usePermissions");

const { ACL } = permissionHelpers;
const webId = "webId";
const permission = {
  webId,
  alias: ACL.CONTROL.alias,
  acl: ACL.CONTROL.acl,
  profile: { webId },
};

describe("AgentAccessList", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("it renders three lists of permissions for editors, viewers and blocked", () => {
    usePermissions.mockReturnValue({ permissions: [permission] });
    const { asFragment } = renderWithTheme(<ResourceSharing />);
    expect(asFragment()).toMatchSnapshot();
  });
  test("it renders a spinner while loading permissions for access control", () => {
    usePermissions.mockReturnValue({ permissions: null });
    const { asFragment } = renderWithTheme(<ResourceSharing />);
    expect(asFragment()).toMatchSnapshot();
  });
});