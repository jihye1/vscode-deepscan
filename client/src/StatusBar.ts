/* --------------------------------------------------------------------------------------------
 * Copyright (c) S-Core Co., Ltd. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import * as vscode from 'vscode';

import { CommandIds, Status } from './types';

export class StatusBar {
    statusBarItem: vscode.StatusBarItem;
    status: Status;

    constructor() {
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 0);
        this.setStatus(Status.ok);
    
        this.statusBarItem.text = 'DeepScan';
        this.statusBarItem.command = CommandIds.showOutput;
    }

    getStatusBarItem() {
        return this.statusBarItem;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status: Status) {
        this.status = status;
    }

    getTooltip() {
        return this.statusBarItem.tooltip;
    }

    setTooltip(text: string | vscode.MarkdownString) {
        this.statusBarItem.tooltip = text;
    }

    setColor(color: string) {
        this.statusBarItem.color = color;
    }

    show(show: boolean): void {
        show ? this.statusBarItem.show() : this.statusBarItem.hide();
    }

    update(status: Status) {
        let tooltip = this.getTooltip();
        let color = '';
        switch (status) {
            case Status.ok:
                color = 'lightgreen';
                tooltip = 'Issue-free!';
                break;
            case Status.warn:
                color = 'yellow';
                tooltip = 'Issue(s) detected!';
                break;
            case Status.fail:
                color = 'darkred';
                tooltip = 'Inspection failed!';
                break;
        }
        this.setColor(color);
        this.setTooltip(tooltip);
        this.setStatus(status);
    }
}
