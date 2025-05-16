//
//  sersimAppWidgetLiveActivity.swift
//  sersimAppWidget
//
//  Created by Kahraman KARADAVUT on 16.05.2025.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct sersimAppWidgetAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var emoji: String
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}

struct sersimAppWidgetLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: sersimAppWidgetAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text("Hello \(context.state.emoji)")
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("Leading")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Bottom \(context.state.emoji)")
                    // more content
                }
            } compactLeading: {
                Text("L")
            } compactTrailing: {
                Text("T \(context.state.emoji)")
            } minimal: {
                Text(context.state.emoji)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension sersimAppWidgetAttributes {
    fileprivate static var preview: sersimAppWidgetAttributes {
        sersimAppWidgetAttributes(name: "World")
    }
}

extension sersimAppWidgetAttributes.ContentState {
    fileprivate static var smiley: sersimAppWidgetAttributes.ContentState {
        sersimAppWidgetAttributes.ContentState(emoji: "😀")
     }
     
     fileprivate static var starEyes: sersimAppWidgetAttributes.ContentState {
         sersimAppWidgetAttributes.ContentState(emoji: "🤩")
     }
}

#Preview("Notification", as: .content, using: sersimAppWidgetAttributes.preview) {
   sersimAppWidgetLiveActivity()
} contentStates: {
    sersimAppWidgetAttributes.ContentState.smiley
    sersimAppWidgetAttributes.ContentState.starEyes
}
