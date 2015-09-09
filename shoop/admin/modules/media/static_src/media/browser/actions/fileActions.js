/**
 * This file is part of Shoop.
 *
 * Copyright (c) 2012-2015, Shoop Ltd. All rights reserved.
 *
 * This source code is licensed under the AGPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const _ = require("lodash");
const remote = require("../util/remote");

export function promptRenameFile(controller, file) {
    const {id, name} = file;
    var newName = _.trim(prompt("New file name?", name) || "");
    if (newName && name !== newName) {
        remote.post({action: "rename_file", id, name}).then(function(response) {
            remote.handleResponseMessages(response);
            controller.reloadFolderContents();
        });
    }
}

export function promptDeleteFile(controller, file) {
    const {id, name} = file;
    if(confirm("Are you sure you want to delete the file " + name + "?")) {
        remote.post({action: "delete_file", id}).then(function(response) {
            remote.handleResponseMessages(response);
            controller.reloadFolderContents();
        });
    }
}
