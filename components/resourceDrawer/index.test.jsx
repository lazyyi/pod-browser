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
import * as RouterFns from "next/router";

import * as solidClientFns from "@inrupt/solid-client";
import mockSession from "../../__testUtils/mockSession";
import mockSessionContextProvider from "../../__testUtils/mockSessionContextProvider";
import ResourceDrawer, { handleCloseDrawer } from "./index";
import { mountToJson } from "../../__testUtils/mountWithTheme";
import mockDetailsContextMenuProvider from "../../__testUtils/mockDetailsContextMenuProvider";

const iri = "/iri/";

describe("ResourceDrawer view", () => {
  let fetch;
  let session;
  let SessionProvider;
  let DetailsMenuContext;

  beforeEach(() => {
    fetch = jest.fn();
    session = mockSession({ fetch });
    SessionProvider = mockSessionContextProvider(session);

    jest.spyOn(RouterFns, "useRouter").mockReturnValue({
      asPath: "/pathname/",
      replace: jest.fn(),
      query: {
        resourceIri: iri,
        action: "details",
      },
    });

    DetailsMenuContext = mockDetailsContextMenuProvider({
      menuOpen: true,
      setMenuOpen: jest.fn,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("it renders a loading view when context has no iri", () => {
    const DetailsContext = mockDetailsContextMenuProvider({
      menuOpen: true,
      setMenuOpen: jest.fn,
    });

    jest.spyOn(RouterFns, "useRouter").mockReturnValue({
      asPath: "/pathname/",
      replace: jest.fn(),
      query: {},
    });

    const tree = mountToJson(
      <DetailsContext>
        <ResourceDrawer />
      </DetailsContext>
    );

    expect(tree).toMatchSnapshot();
  });

  test("it renders a Contents view when the router query has an iri", () => {
    const tree = mountToJson(
      <SessionProvider>
        <DetailsMenuContext>
          <ResourceDrawer />
        </DetailsMenuContext>
      </SessionProvider>
    );
    expect(tree).toMatchSnapshot();
  });

  it("fetches dataset with acl", () => {
    jest
      .spyOn(solidClientFns, "getResourceInfoWithAcl")
      .mockResolvedValueOnce("datasetWithAcl");

    const tree = mountToJson(
      <SessionProvider>
        <DetailsMenuContext>
          <ResourceDrawer />
        </DetailsMenuContext>
      </SessionProvider>
    );
    expect(tree).toMatchSnapshot();
    expect(solidClientFns.getResourceInfoWithAcl).toHaveBeenCalled();
  });
});

describe("handleCloseDrawer", () => {
  test("it creates a function to close the drawer", async () => {
    const setMenuOpen = jest.fn();
    const router = {
      asPath: "/path?with=query",
      replace: jest.fn(),
    };
    const handler = handleCloseDrawer({ setMenuOpen, router });
    await handler();

    expect(setMenuOpen).toHaveBeenCalledWith(false);
    expect(router.replace).toHaveBeenCalledWith("/resource/[iri]", "/path");
  });
});